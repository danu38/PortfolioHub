import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { Input, TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { enhanceText, generateSkillsFromBio } from '../../services/geminiService';

interface ProfileEditorProps {
  profile: UserProfile;
  onChange: (p: UserProfile) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onChange }) => {
  const [isEnhancingBio, setIsEnhancingBio] = useState(false);
  const [isGeneratingSkills, setIsGeneratingSkills] = useState(false);

  const handleChange = (field: keyof UserProfile, value: any) => {
    onChange({ ...profile, [field]: value });
  };

  const handleSocialChange = (field: keyof UserProfile['socials'], value: string) => {
    onChange({ ...profile, socials: { ...profile.socials, [field]: value } });
  };

  const handleEnhanceBio = async () => {
    setIsEnhancingBio(true);
    const newBio = await enhanceText(profile.bio, 'bio');
    handleChange('bio', newBio);
    setIsEnhancingBio(false);
  };

  const handleAutoSkills = async () => {
    setIsGeneratingSkills(true);
    const skills = await generateSkillsFromBio(profile.bio);
    if (skills.length > 0) {
      handleChange('skills', skills);
    }
    setIsGeneratingSkills(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-display font-bold text-white">Personal Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Full Name" 
          value={profile.fullName} 
          onChange={(e) => handleChange('fullName', e.target.value)} 
        />
        <Input 
          label="Job Title" 
          value={profile.title} 
          onChange={(e) => handleChange('title', e.target.value)} 
        />
        <Input 
          label="Email" 
          value={profile.email} 
          onChange={(e) => handleChange('email', e.target.value)} 
        />
        <Input 
          label="Location" 
          value={profile.location} 
          onChange={(e) => handleChange('location', e.target.value)} 
        />
        <div className="md:col-span-2">
           <Input 
            label="Profile Photo URL" 
            value={profile.avatarUrl || ''} 
            onChange={(e) => handleChange('avatarUrl', e.target.value)} 
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="space-y-2">
         <TextArea 
            label="Professional Bio" 
            value={profile.bio} 
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={4}
            action={
              <Button 
                size="sm" 
                variant="secondary" 
                className="text-xs py-0.5 h-6 bg-indigo-600 hover:bg-indigo-500"
                isLoading={isEnhancingBio}
                onClick={handleEnhanceBio}
                icon={<span className="text-xs">✨</span>}
              >
                AI Polish
              </Button>
            }
          />
      </div>

      <div className="space-y-2">
        <TextArea 
          label="Professional Goals / Objective" 
          value={profile.goals} 
          onChange={(e) => handleChange('goals', e.target.value)}
          rows={3}
          placeholder="What are your career goals or next steps?"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end mb-1">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Skills</label>
           <Button 
                size="sm" 
                variant="ghost" 
                className="text-xs py-0.5 h-6 text-indigo-400 hover:text-indigo-300"
                isLoading={isGeneratingSkills}
                onClick={handleAutoSkills}
                icon={<span className="text-xs">⚡</span>}
              >
                Auto-generate from Bio
              </Button>
        </div>
        <Input 
          value={profile.skills.join(', ')} 
          onChange={(e) => handleChange('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="React, Design, Communication..."
        />
      </div>

      <h4 className="text-md font-bold text-slate-300 mt-6 mb-2">Social Links</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="GitHub" 
          value={profile.socials.github || ''} 
          onChange={(e) => handleSocialChange('github', e.target.value)} 
        />
        <Input 
          label="LinkedIn" 
          value={profile.socials.linkedin || ''} 
          onChange={(e) => handleSocialChange('linkedin', e.target.value)} 
        />
        <Input 
          label="Twitter / X" 
          value={profile.socials.twitter || ''} 
          onChange={(e) => handleSocialChange('twitter', e.target.value)} 
        />
        <Input 
          label="Portfolio / Website" 
          value={profile.socials.website || ''} 
          onChange={(e) => handleSocialChange('website', e.target.value)} 
        />
      </div>
    </div>
  );
};