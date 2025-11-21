import React, { useState } from 'react';
import { Project } from '../../types';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';
import { enhanceText } from '../../services/geminiService';

interface ProjectEditorProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectEditor: React.FC<ProjectEditorProps> = ({ projects, onChange }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleAdd = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
    };
    onChange([...projects, newProject]);
    setActiveId(newProject.id);
  };

  const handleUpdate = (id: string, field: keyof Project, value: any) => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(projects.filter(p => p.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const handleTechChange = (id: string, str: string) => {
    const techs = str.split(',').map(t => t.trim()).filter(Boolean);
    handleUpdate(id, 'technologies', techs);
  };

  const handleAiEnhance = async (id: string, text: string) => {
    setIsEnhancing(true);
    const enhanced = await enhanceText(text, 'project');
    handleUpdate(id, 'description', enhanced);
    setIsEnhancing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-display font-bold text-white">Projects</h3>
        <Button onClick={handleAdd} size="sm" variant="outline">+ Add Project</Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 transition-all hover:border-slate-600">
            <div className="flex justify-between items-center mb-4">
               <div onClick={() => setActiveId(activeId === proj.id ? null : proj.id)} className="cursor-pointer flex-1">
                <h4 className="font-bold text-white">{proj.title || 'New Project'}</h4>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(proj.id)} className="text-red-400 hover:text-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </Button>
            </div>

            {activeId === proj.id && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <Input 
                  label="Project Title" 
                  value={proj.title} 
                  onChange={(e) => handleUpdate(proj.id, 'title', e.target.value)} 
                />
                 <Input 
                  label="Technologies (comma separated)" 
                  value={proj.technologies.join(', ')} 
                  onChange={(e) => handleTechChange(proj.id, e.target.value)}
                  placeholder="React, TypeScript, Tailwind"
                />
                <Input 
                  label="Project Link / Demo URL" 
                  value={proj.link || ''} 
                  onChange={(e) => handleUpdate(proj.id, 'link', e.target.value)}
                  placeholder="https://..."
                />
                 <Input 
                  label="Image URL (optional)" 
                  value={proj.imageUrl || ''} 
                  onChange={(e) => handleUpdate(proj.id, 'imageUrl', e.target.value)}
                  placeholder="https://picsum.photos/400/300"
                />
                <TextArea 
                  label="Description" 
                  value={proj.description} 
                  onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)}
                  rows={3}
                  action={
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="text-xs py-0.5 h-6 bg-indigo-600 hover:bg-indigo-500"
                      isLoading={isEnhancing}
                      onClick={() => handleAiEnhance(proj.id, proj.description)}
                      icon={<span className="text-xs">✨</span>}
                    >
                      AI Polish
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};