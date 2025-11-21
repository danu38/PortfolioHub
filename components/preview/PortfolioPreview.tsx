import React from 'react';
import { UserProfile } from '../../types';

interface Props {
  profile: UserProfile;
}

export const PortfolioPreview: React.FC<Props> = ({ profile }) => {
  return (
    <div className="w-full h-full bg-white text-slate-900 overflow-y-auto font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* Hero Section */}
      <header className="bg-slate-900 text-white py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500 rounded-full blur-3xl opacity-10 -mr-20 -mt-40 pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-3xl opacity-10 -ml-20 -mb-20 pointer-events-none mix-blend-screen"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {profile.avatarUrl ? (
               <img src={profile.avatarUrl} alt={profile.fullName} className="w-40 h-40 rounded-full border-4 border-white/10 shadow-2xl object-cover" />
            ) : (
              <div className="w-40 h-40 rounded-full border-4 border-white/10 bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
                {profile.fullName.charAt(0)}
              </div>
            )}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-4">{profile.fullName}</h1>
              <p className="text-2xl md:text-3xl text-brand-300 font-light mb-6">{profile.title}</p>
              <p className="max-w-2xl text-slate-300 text-lg leading-relaxed mx-auto md:mx-0 font-light">{profile.bio}</p>
              
              <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                {profile.socials.github && (
                   <a href={`https://${profile.socials.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors text-sm font-medium">GitHub</a>
                )}
                {profile.socials.linkedin && (
                   <a href={`https://${profile.socials.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 rounded-full transition-colors text-sm font-medium shadow-lg shadow-brand-900/20">LinkedIn</a>
                )}
                {profile.socials.website && (
                   <a href={`https://${profile.socials.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="px-6 py-2.5 border border-white/20 hover:border-white/50 rounded-full transition-colors text-sm font-medium">Website</a>
                )}
                <a href={`mailto:${profile.email}`} className="px-6 py-2.5 border border-white/20 hover:border-white/50 rounded-full transition-colors text-sm font-medium">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-24">
        
        {/* Skills */}
        {profile.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-display font-bold mb-8 flex items-center gap-3 text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-0.5 bg-brand-500"></span>
              Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, i) => (
                <span key={i} className="px-5 py-2.5 bg-slate-50 text-slate-700 rounded-full text-sm font-medium hover:bg-brand-50 hover:text-brand-700 transition-all cursor-default border border-slate-100 hover:border-brand-200 hover:-translate-y-0.5 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Grid - Bento Style */}
        {profile.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-display font-bold mb-8 flex items-center gap-3 text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-0.5 bg-purple-500"></span>
              Selected Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.projects.map((project, i) => (
                <div key={project.id} className={`group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  <div className={`bg-slate-100 relative overflow-hidden ${i === 0 ? 'h-64 lg:h-96' : 'h-48'}`}>
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 text-slate-300 p-6 text-center">
                         <span className="text-6xl mb-2 opacity-50">⚡</span>
                      </div>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 bg-white text-slate-900 px-5 py-2.5 rounded-full text-xs font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        VIEW PROJECT ↗
                      </a>
                    )}
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-600 transition-colors">{project.title}</h3>
                    <p className="text-slate-500 text-base leading-relaxed mb-6 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech, t) => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-slate-200 px-2 py-1 rounded-md">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience */}
          {profile.experiences.length > 0 && (
            <section>
               <h2 className="text-xl font-display font-bold mb-10 flex items-center gap-3 text-slate-400 uppercase tracking-widest">
                <span className="w-6 h-0.5 bg-indigo-500"></span>
                Experience
              </h2>
              <div className="space-y-12 border-l border-slate-200 ml-3 pl-10 relative">
                {profile.experiences.map((exp) => (
                  <div key={exp.id} className="relative group">
                    <span className="absolute -left-[45px] top-2 h-2.5 w-2.5 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors ring-4 ring-white"></span>
                    <div className="flex flex-col mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                      <p className="text-indigo-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 block">{exp.startDate} - {exp.endDate}</span>
                    <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
           {profile.education.length > 0 && (
            <section>
               <h2 className="text-xl font-display font-bold mb-10 flex items-center gap-3 text-slate-400 uppercase tracking-widest">
                <span className="w-6 h-0.5 bg-pink-500"></span>
                Education
              </h2>
              <div className="space-y-6">
                {profile.education.map((edu) => (
                  <div key={edu.id} className="group bg-slate-50 hover:bg-pink-50/50 p-6 rounded-2xl border border-slate-100 hover:border-pink-100 transition-all">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{edu.school}</h3>
                    <p className="text-pink-600 font-medium mb-2">{edu.degree}</p>
                    <p className="text-sm text-slate-400 font-mono">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Goals Section */}
        {profile.goals && (
          <section className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 opacity-10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-10 rounded-full blur-3xl -ml-10 -mb-10"></div>
             <div className="relative z-10 max-w-3xl mx-auto">
               <span className="uppercase tracking-widest text-xs font-bold text-brand-400 mb-6 block">Future Horizons</span>
               <p className="text-2xl md:text-4xl font-display font-medium leading-tight">"{profile.goals}"</p>
             </div>
          </section>
        )}
      </main>

      <footer className="bg-slate-50 py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</p>
      </footer>
    </div>
  );
};