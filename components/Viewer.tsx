import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserProfile } from '../types';
import { getPortfolio } from '../services/database';
import { PortfolioPreview } from './preview/PortfolioPreview';

export const Viewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!id) return;
      const data = await getPortfolio(id);
      if (data) {
        setProfile(data);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    loadProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 animate-pulse">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950 text-white p-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-display font-bold mb-4">404</h1>
          <p className="text-xl text-slate-400 mb-8">This portfolio hasn't been built yet or doesn't exist.</p>
          <Link to="/" className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-full font-bold transition-all">
            Build Your Own Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <PortfolioPreview profile={profile} />
      <a href="/" className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl border border-slate-700 hover:bg-black transition-colors opacity-50 hover:opacity-100">
        Built with Portfol.io
      </a>
    </div>
  );
};