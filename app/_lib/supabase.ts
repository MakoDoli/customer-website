import { createClient } from "@supabase/supabase-js";

const url: string = process.env.SUPABASE_URL!;
const key: string = process.env.SUPABASE_KEY!;

export const supabase = createClient(url, key);
