import { redirect } from "next/navigation";
import { PanelCard } from "@/components/panel-card";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { SiteShell } from "@/components/site-shell";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function SignUpPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <SiteShell
      current="/sign-up"
      title="Create an account that keeps your work persistent and protected."
      subtitle="Registration now connects to Supabase Auth, blocks known disposable email providers in the UI, and prepares users for verified access across saved workspaces and reports."
    >
      <section className="stackSection authLayout">
        <PanelCard title="Create Account">
          <SignUpForm />
        </PanelCard>
        <PanelCard title="How to use">
          <p>
            Sign up with a legitimate email, confirm ownership through the verification email,
            and then start saving workspaces, monitoring packs, and reports inside your own account.
          </p>
          <h3>Benefits</h3>
          <p>
            New visitors understand immediately that an account is not just for login. It is
            what unlocks persistence, reporting history, team workflows, and subscription value.
          </p>
        </PanelCard>
      </section>
    </SiteShell>
  );
}
