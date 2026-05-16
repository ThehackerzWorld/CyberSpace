import { NextResponse } from "next/server";
import { featureFlags } from "@/lib/env";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json({
    ok: featureFlags.hasBilling,
    message: featureFlags.hasBilling
      ? "Billing provider credentials are present. Wire Stripe checkout session creation here."
      : "Billing credentials are not configured yet.",
    requestedPlan: typeof body?.plan === "string" ? body.plan : null
  });
}
