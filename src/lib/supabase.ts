import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : ({} as any);
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://lxgcnvboggihzfyhtlrm.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4Z2NudmJvZ2dpaHpmeWh0bHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTcwMDEsImV4cCI6MjA3NTQ5MzAwMX0.Lzo9QUcF_7eGN50EmpndWRrsqP-1z8SsjqMCe9b0kIk';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please check your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
