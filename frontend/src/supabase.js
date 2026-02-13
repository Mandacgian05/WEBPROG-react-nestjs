/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// If these are undefined, the POST will fail
export const supabase = createClient(supabaseUrl, supabaseKey);
