import React, { useState } from 'react';
import { Experience } from '../../types';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';
import { enhanceText } from '../../services/geminiService';

interface ExperienceEditorProps {
  experiences: Experience[];
  onChange: (exps: Experience[]) => void;
}

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ experiences, onChange }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleAdd = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    onChange([...experiences, newExp]);
    setActiveId(newExp.id);
  };

  const handleUpdate = (id: string, field: keyof Experience, value: string) => {
    const updated = experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const handleAiEnhance = async (id: string, text: string) => {
    setIsEnhancing(true);
    const enhanced = await enhanceText(text, 'job');
    handleUpdate(id, 'description', enhanced);
    setIsEnhancing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-display font-bold text-white">Work Experience</h3>
        <Button onClick={handleAdd} size="sm" variant="outline">+ Add Role</Button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 transition-all hover:border-slate-600">
            <div className="flex justify-between items-start mb-4">
              <div onClick={() => setActiveId(activeId === exp.id ? null : exp.id)} className="cursor-pointer flex-1">
                <h4 className="font-bold text-white">{exp.role || 'New Role'}</h4>
                <p className="text-sm text-slate-400">{exp.company || 'Company Name'}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(exp.id)} className="text-red-400 hover:text-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </Button>
            </div>

            {activeId === exp.id && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <Input 
                  label="Company" 
                  value={exp.company} 
                  onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)} 
                  placeholder="e.g. Google"
                />
                <Input 
                  label="Role Title" 
                  value={exp.role} 
                  onChange={(e) => handleUpdate(exp.id, 'role', e.target.value)} 
                  placeholder="e.g. Senior Engineer"
                />
                <Input 
                  label="Start Date" 
                  value={exp.startDate} 
                  onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)} 
                  placeholder="Jan 2020"
                />
                <Input 
                  label="End Date" 
                  value={exp.endDate} 
                  onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)} 
                  placeholder="Present"
                />
                <div className="md:col-span-2">
                  <TextArea 
                    label="Description" 
                    value={exp.description} 
                    onChange={(e) => handleUpdate(exp.id, 'description', e.target.value)}
                    rows={4}
                    placeholder="Describe your responsibilities and achievements..."
                    action={
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="text-xs py-0.5 h-6 bg-indigo-600 hover:bg-indigo-500"
                        isLoading={isEnhancing}
                        onClick={() => handleAiEnhance(exp.id, exp.description)}
                        icon={<span className="text-xs">✨</span>}
                      >
                        AI Polish
                      </Button>
                    }
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        
        {experiences.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-slate-700 rounded-xl text-slate-500">
            No experience added yet.
          </div>
        )}
      </div>
    </div>
  );
};