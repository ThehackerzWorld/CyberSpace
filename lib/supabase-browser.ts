"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseBrowserKey, getSupabaseUrl } from "@/lib/supabase-config";

export function createBrowserSupabaseClient() {
  return createBrowserClient(getSupabaseUrl(), getSupabaseBrowserKey());
}
