import { createClient } from '@supabase/supabase-js';
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const supabase = url && key ? createClient(url, key) : null;
// Cliente aparte (sin guardar sesión) para crear usuarios sin cerrar la sesión del admin
export const createIsolatedClient = () =>
  url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
