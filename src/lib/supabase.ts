import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key';

// Create a single supabase client for interacting with your database
// We use the service role key here because these API routes execute securely on the server
export const supabase = createClient(supabaseUrl, supabaseKey);
