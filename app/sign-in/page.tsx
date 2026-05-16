import { redirect } from "next/navigation";
import { PanelCard } from "@/components/panel-card";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SiteShell } from "@/components/site-shell";
import { featureFlags } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function SignInPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <SiteShell
      current="/sign-in"
      title="Sign in to continue your saved security workflow."
      subtitle="Sign-in now uses Supabase server-side auth with secure cookies so returning users can continue their saved intelligence work across sessions."
    >
      <section className="stackSection authLayout">
        <PanelCard title="Access Portal">
          <SignInForm />
        </PanelCard>
        <PanelCard title="How to use">
          <p>
            Users sign in with their verified email and password, then return to the exact
            investigations, saved reports, and subscription-aware workflows they were using previously.
          </p>
          <h3>Benefits</h3>
          <p>
            The experience feels more premium because access is secure, persistent, and clearly
            tied to saved value inside the platform.
          </p>
          <div className="statusNote">
            Live auth state: {featureFlags.hasSupabase ? "Supabase auth is configured locally." : "Awaiting Supabase credentials."}
          </div>
        </PanelCard>
      </section>
    </SiteShell>
  );
}
