import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Exportamos esta instancia para usarla en toda la app
export const supabase = createClient(supabaseUrl, supabaseKey);