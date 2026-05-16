import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { env, supabasePublicKey } from "@/lib/env";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/dashboard";
  const redirectUrl = new URL(next, request.url);

  if (!code || !env.NEXT_PUBLIC_SUPABASE_URL || !supabasePublicKey) {
    return NextResponse.redirect(new URL("/verify?status=missing-code", request.url));
  }

  let response = NextResponse.redirect(redirectUrl);

  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, supabasePublicKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.redirect(redirectUrl);
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL(`/verify?status=failed&message=${encodeURIComponent(error.message)}`, request.url));
  }

  return response;
}
