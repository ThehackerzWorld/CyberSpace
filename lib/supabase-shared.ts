import { createClient } from "@supabase/supabase-js";
import { getSupabaseServerKey, getSupabaseUrl } from "@/lib/supabase-config";

export function createServiceSupabaseClient() {
  return createClient(getSupabaseUrl(), getSupabaseServerKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
