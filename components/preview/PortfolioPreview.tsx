import React from 'react';
import { UserProfile } from '../../types';

interface Props {
  profile: UserProfile;
}

export const PortfolioPreview: React.FC<Props> = ({ profile }) => {
  return (
    <div className="w-full h-full bg-white text-slate-900 overflow-y-auto font-sans">
      {/* Hero Section */}
      <header className="bg-slate-900 text-white py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 -ml-20 -mb-20 pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {profile.avatarUrl && (
               <img src={profile.avatarUrl} alt={profile.fullName} className="w-32 h-32 rounded-full border-4 border-white/20 shadow-xl object-cover" />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-2">{profile.fullName}</h1>
              <p className="text-xl md:text-2xl text-brand-300 font-light mb-6">{profile.title}</p>
              <p className="max-w-2xl text-slate-300 text-lg leading-relaxed mx-auto md:mx-0">{profile.bio}</p>
              
              <div className="flex gap-4 mt-8 justify-center md:justify-start">
                {profile.socials.github && (
                   <a href={`https://${profile.socials.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors text-sm font-medium">GitHub</a>
                )}
                {profile.socials.linkedin && (
                   <a href={`https://${profile.socials.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="px-5 py-2 bg-brand-600 hover:bg-brand-500 rounded-full transition-colors text-sm font-medium">LinkedIn</a>
                )}
                <a href={`mailto:${profile.email}`} className="px-5 py-2 border border-white/20 hover:border-white/50 rounded-full transition-colors text-sm font-medium">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-20">
        
        {/* Skills */}
        {profile.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-500 rounded-full"></span>
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, i) => (
                <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-brand-50 hover:text-brand-700 transition-colors cursor-default border border-transparent hover:border-brand-200">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Grid - Bento Style */}
        {profile.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.projects.map((project, i) => (
                <div key={project.id} className={`group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  <div className={`bg-slate-100 relative overflow-hidden ${i === 0 ? 'h-64 lg:h-80' : 'h-48'}`}>
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
                         <span className="text-4xl opacity-20">PROJECT</span>
                      </div>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                        VIEW PROJECT ↗
                      </a>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">{project.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech, t) => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {profile.experiences.length > 0 && (
          <section>
             <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
              Experience
            </h2>
            <div className="space-y-12 border-l-2 border-slate-200 ml-3 pl-8 relative">
              {profile.experiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <span className="absolute -left-[39px] top-1.5 h-5 w-5 rounded-full border-4 border-white bg-slate-300 ring-1 ring-slate-200"></span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-sm font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-brand-600 font-medium mb-3">{exp.company}</p>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Goals Section (Unique Touch) */}
        {profile.goals && (
          <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>
             <div className="relative z-10 text-center max-w-2xl mx-auto">
               <span className="uppercase tracking-widest text-xs font-bold text-brand-400 mb-4 block">Current Focus & Goals</span>
               <p className="text-2xl md:text-3xl font-display font-light italic">"{profile.goals}"</p>
             </div>
          </section>
        )}
      </main>

      <footer className="bg-slate-50 py-12 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} {profile.fullName}. Built with Portfol.io</p>
      </footer>
    </div>
  );
};