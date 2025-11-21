import React, { useState } from 'react';
import { Education } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface EducationEditorProps {
  education: Education[];
  onChange: (edu: Education[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({ education, onChange }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleAdd = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      year: ''
    };
    onChange([...education, newEdu]);
    setActiveId(newEdu.id);
  };

  const handleUpdate = (id: string, field: keyof Education, value: string) => {
    const updated = education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
    if (activeId === id) setActiveId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-display font-bold text-white">Education</h3>
        <Button onClick={handleAdd} size="sm" variant="outline">+ Add Education</Button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 transition-all hover:border-slate-600">
            <div className="flex justify-between items-center mb-4">
              <div onClick={() => setActiveId(activeId === edu.id ? null : edu.id)} className="cursor-pointer flex-1">
                <h4 className="font-bold text-white">{edu.school || 'School Name'}</h4>
                <p className="text-sm text-slate-400">{edu.degree || 'Degree'}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(edu.id)} className="text-red-400 hover:text-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </Button>
            </div>

            {activeId === edu.id && (
              <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <Input 
                  label="School / University" 
                  value={edu.school} 
                  onChange={(e) => handleUpdate(edu.id, 'school', e.target.value)} 
                  placeholder="e.g. Stanford University"
                />
                <Input 
                  label="Degree / Certificate" 
                  value={edu.degree} 
                  onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)} 
                  placeholder="e.g. BS Computer Science"
                />
                <Input 
                  label="Year(s)" 
                  value={edu.year} 
                  onChange={(e) => handleUpdate(edu.id, 'year', e.target.value)} 
                  placeholder="2018 - 2022"
                />
              </div>
            )}
          </div>
        ))}
        
        {education.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-slate-700 rounded-xl text-slate-500">
            No education added yet.
          </div>
        )}
      </div>
    </div>
  );
};