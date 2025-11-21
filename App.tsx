import React, { useState, useEffect } from 'react';
import { UserProfile, INITIAL_PROFILE } from './types';
import { Button } from './components/ui/Button';
import { ProfileEditor } from './components/editor/ProfileEditor';
import { ExperienceEditor } from './components/editor/ExperienceEditor';
import { ProjectEditor } from './components/editor/ProjectEditor';
import { EducationEditor } from './components/editor/EducationEditor';
import { PortfolioPreview } from './components/preview/PortfolioPreview';

function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('portfolio_data');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'projects' | 'education'>('profile');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    localStorage.setItem('portfolio_data', JSON.stringify(profile));
  }, [profile]);

  const renderEditor = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileEditor profile={profile} onChange={setProfile} />;
      case 'experience':
        return <ExperienceEditor experiences={profile.experiences} onChange={(exps) => setProfile({...profile, experiences: exps})} />;
      case 'education':
        return <EducationEditor education={profile.education} onChange={(edu) => setProfile({...profile, education: edu})} />;
      case 'projects':
        return <ProjectEditor projects={profile.projects} onChange={(projs) => setProfile({...profile, projects: projs})} />;
      default:
        return null;
    }
  };

  // Mobile/Tablet View (Separate Tabs)
  if (viewMode === 'preview') {
    return (
      <div className="h-screen w-full relative">
        <PortfolioPreview profile={profile} />
        <div className="fixed bottom-6 right-6 z-50">
          <Button onClick={() => setViewMode('edit')} className="shadow-2xl rounded-full px-6 py-3">
            ✏️ Back to Editor
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* Left Panel: Editor */}
      <div className="w-full lg:w-[450px] xl:w-[500px] flex flex-col border-r border-slate-800 h-full">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-500 to-purple-600"></div>
            <h1 className="font-display font-bold text-xl tracking-tight">Portfol.io</h1>
          </div>
          <p className="text-xs text-slate-400">AI-Powered Portfolio Builder</p>
        </div>

        {/* Navigation */}
        <div className="flex p-2 bg-slate-900/30 mx-4 mt-4 rounded-lg gap-1 overflow-x-auto">
          {(['profile', 'experience', 'education', 'projects'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[80px] py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                activeTab === tab 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {renderEditor()}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/80 backdrop-blur flex justify-between items-center lg:hidden">
           <Button onClick={() => setViewMode('preview')} className="w-full">
             Preview Portfolio
           </Button>
        </div>
        
        <div className="hidden lg:flex p-4 bg-slate-900/50 text-[10px] text-slate-500 text-center justify-center">
           Changes save automatically to local storage.
        </div>
      </div>

      {/* Right Panel: Live Preview (Desktop Only) */}
      <div className="hidden lg:block flex-1 bg-slate-900 h-full overflow-hidden relative">
        <div className="absolute inset-4 bg-white rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-800/50">
          <PortfolioPreview profile={profile} />
        </div>
      </div>
    </div>
  );
}

export default App;