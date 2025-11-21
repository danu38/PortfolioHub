import { UserProfile } from "../types";

/**
 * database.ts
 * 
 * This file handles saving and retrieving portfolio data.
 * 
 * CURRENT STATE:
 * It simulates a database using LocalStorage so you can test the "Publish" 
 * and "Share Link" features immediately without setting up a real backend.
 * 
 * TO USE SUPABASE (Real Database):
 * 1. Install supabase: npm install @supabase/supabase-js
 * 2. Create a project at supabase.com
 * 3. Create a table 'portfolios' with columns: id (text, primary key), data (jsonb)
 * 4. Uncomment the Supabase code below and remove the LocalStorage code.
 */

// --- START SUPABASE CONFIGURATION (Uncomment when ready) ---
/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const savePortfolio = async (id: string, data: UserProfile): Promise<boolean> => {
  const { error } = await supabase
    .from('portfolios')
    .upsert({ id, data });
    
  if (error) {
    console.error('Error saving:', error);
    return false;
  }
  return true;
};

export const getPortfolio = async (id: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('portfolios')
    .select('data')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data.data;
};
*/
// --- END SUPABASE CONFIGURATION ---


// --- START LOCAL STORAGE SIMULATION (Delete when using Supabase) ---

// Simulating a cloud database using a browser-wide dictionary
const MOCK_DB_KEY = 'portfol_io_db';

export const savePortfolio = async (id: string, data: UserProfile): Promise<boolean> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    const db = JSON.parse(localStorage.getItem(MOCK_DB_KEY) || '{}');
    db[id] = data;
    localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getPortfolio = async (id: string): Promise<UserProfile | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const db = JSON.parse(localStorage.getItem(MOCK_DB_KEY) || '{}');
  return db[id] || null;
};

// Helper to generate a random ID if user doesn't have one
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

// --- END LOCAL STORAGE SIMULATION ---