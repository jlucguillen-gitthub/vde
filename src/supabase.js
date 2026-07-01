import { createClient } from '@supabase/supabase-js'


// NEXT_PUBLIC_SUPABASE_URL="https://lqgkxpvkauoaeqtbndoy.supabase.co"
const supabaseUrl="https://lqgkxpvkauoaeqtbndoy.supabase.co"
// NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_H4tSIx00f566u0OBCKa3Tg_1mvwIpRu"
const supabaseKey = "sb_publishable_H4tSIx00f566u0OBCKa3Tg_1mvwIpRu"
export const supabase = createClient(
    supabaseUrl,
    supabaseKey
)