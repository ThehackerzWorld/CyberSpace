import { env, supabasePublicKey, supabaseServiceKey } from "@/lib/env";

export function getSupabaseUrl() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Supabase URL is missing.");
  }

  return env.NEXT_PUBLIC_SUPABASE_URL;
}

export function getSupabaseBrowserKey() {
  if (!supabasePublicKey) {
    throw new Error("Supabase public key is missing.");
  }

  return supabasePublicKey;
}

export function getSupabaseServerKey() {
  if (!supabaseServiceKey) {
    throw new Error("Supabase service key is missing.");
  }

  return supabaseServiceKey;
}
