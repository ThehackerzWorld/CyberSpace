import { NextResponse } from "next/server";
import { featureFlags } from "@/lib/env";
import { subscriptionPlans } from "@/lib/platform-data";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "digitalchirkut-platform-app",
    timestamp: new Date().toISOString(),
    features: featureFlags,
    plans: subscriptionPlans.map((plan) => ({
      name: plan.name,
      price: plan.price,
      audience: plan.audience
    }))
  });
}
