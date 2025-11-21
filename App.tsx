import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { UserProfile, INITIAL_PROFILE } from './types';
import { Button } from './components/ui/Button';
import { ProfileEditor } from './components/editor/ProfileEditor';
import { ExperienceEditor } from './components/editor/ExperienceEditor';
import { ProjectEditor } from './components/editor/ProjectEditor';
import { EducationEditor } from './components/editor/EducationEditor';
import { PortfolioPreview } from './components/preview/PortfolioPreview';
import { Viewer } from './components/Viewer';
import { savePortfolio, generateId } from './services/database';

// The Editor Application
const Builder = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('portfolio_data');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'projects' | 'education'>('profile');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedId, setPublishedId] = useState<string | null>(null);

  // Determine a unique ID for this user (simulated auth)
  useEffect(() => {
    let myId = localStorage.getItem('my_portfolio_id');
    if (!myId) {
      myId = generateId();
      localStorage.setItem('my_portfolio_id', myId);
    }
    setPublishedId(myId);
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio_data', JSON.stringify(profile));
  }, [profile]);

  const handlePublish = async () => {
    if (!publishedId) return;
    setIsPublishing(true);
    
    const success = await savePortfolio(publishedId, profile);
    
    setIsPublishing(false);
    if (success) {
      // In a real app, you might show a toast notification here
      alert(`Published Successfully! Your URL: ${window.location.origin}/p/${publishedId}`);
    } else {
      alert("Failed to save. Please try again.");
    }
  };

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
        <div className="fixed bottom-6 right-6 z-50 flex gap-2">
          <Button onClick={() => setViewMode('edit')} className="shadow-2xl rounded-full px-6 py-3">
            ✏️ Edit
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-500 to-purple-600"></div>
              <h1 className="font-display font-bold text-xl tracking-tight">Portfol.io</h1>
            </div>
            <div className="flex gap-2">
               {publishedId && (
                 <Link to={`/p/${publishedId}`} target="_blank" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2">
                   View Live ↗
                 </Link>
               )}
               <Button 
                size="sm" 
                variant="primary" 
                onClick={handlePublish} 
                isLoading={isPublishing}
                className="bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 border-0"
              >
                {isPublishing ? 'Publishing...' : 'Publish Site'}
              </Button>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex p-1 bg-slate-900 rounded-lg gap-1 overflow-x-auto border border-slate-800">
            {(['profile', 'experience', 'education', 'projects'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[80px] py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                  activeTab === tab 
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {renderEditor()}
        </div>

        {/* Footer Actions (Mobile) */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/80 backdrop-blur flex justify-between items-center lg:hidden">
           <Button onClick={() => setViewMode('preview')} className="w-full">
             Preview Portfolio
           </Button>
        </div>
      </div>

      {/* Right Panel: Live Preview (Desktop Only) */}
      <div className="hidden lg:block flex-1 bg-slate-900 h-full overflow-hidden relative p-8 flex flex-col">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-xs font-mono text-slate-500 uppercase">Live Preview</span>
          {publishedId && <span className="text-xs font-mono text-slate-600">your-site.com/p/{publishedId}</span>}
        </div>
        <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-2xl ring-8 ring-slate-800">
          <PortfolioPreview profile={profile} />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/p/:id" element={<Viewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;