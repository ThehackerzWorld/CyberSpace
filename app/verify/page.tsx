import Link from "next/link";
import { PanelCard } from "@/components/panel-card";
import { SiteShell } from "@/components/site-shell";

type VerifyPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const params = (await searchParams) ?? {};
  const status = typeof params.status === "string" ? params.status : "ready";
  const message = typeof params.message === "string" ? params.message : "";

  return (
    <SiteShell
      current="/verify"
      title="Verification and MFA designed for secure, understandable access."
      subtitle="Supabase email verification is now wired through a callback route, and this page explains what the user should do next when email confirmation succeeds or fails."
    >
      <section className="stackSection authLayout">
        <PanelCard title="Verification Status">
          <p>
            {status === "failed"
              ? "The verification link could not complete the session exchange."
              : status === "missing-code"
                ? "No verification code was found in the callback request."
                : "Use the link sent to your inbox to finish account verification and return to the platform."}
          </p>
          {message ? <p className="authError">{message}</p> : null}
          <div className="authActionRow">
            <Link href="/sign-in" className="primaryLink">
              Back to Sign In
            </Link>
            <Link href="/sign-up">Create Another Account</Link>
          </div>
        </PanelCard>
        <PanelCard title="Why this matters">
          <p>
            Verified email ownership helps reduce low-effort abuse, protects saved investigations,
            and gives paying users more confidence that their work and subscription access are
            being handled responsibly.
          </p>
          <h3>Important note</h3>
          <p>
            Supabase handles email verification and password recovery. A true six-digit email MFA
            challenge remains a separate product layer to add after SMTP is configured.
          </p>
        </PanelCard>
      </section>
    </SiteShell>
  );
}
