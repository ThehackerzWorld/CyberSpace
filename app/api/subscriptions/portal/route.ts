import { NextResponse } from "next/server";
import { featureFlags } from "@/lib/env";

export async function POST() {
  return NextResponse.json({
    ok: featureFlags.hasBilling,
    message: featureFlags.hasBilling
      ? "Customer billing portal wiring point is ready."
      : "Billing credentials are not configured yet."
  });
}
