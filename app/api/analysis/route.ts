import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    // Gemini analysis has been removed per user request.
    // Returning a mock response to maintain UI functionality.
    const mockResult = `
INTELLIGENCE ASSESSMENT (SIMULATED)
----------------------------------
Target: Data provided in prompt

1. POTENTIAL EXPOSURE POINTS
- External service misconfigurations based on common patterns.
- Information disclosure via leaked credentials in public repositories.
- Unencrypted data transmission vectors.

2. RECOMMENDED RECONNAISSANCE
- Site-specific searches for internal documentation.
- WHOIS and DNS record analysis for sub-domain enumeration.
- OSINT checks across known breach databases.

3. MITIGATION STRATEGIES
- Enforce strict IAM policies and MFA across all access points.
- Implement regular automated vulnerability scanning.
- Review and harden external-facing API endpoints.

NOTE: Real-time AI analysis is currently disabled.
    `.trim();

    return NextResponse.json({ result: mockResult });
  } catch (error: any) {
    console.error("Analysis Route Error:", error);
    return NextResponse.json(
      { error: "Failed to process analysis request." },
      { status: 500 }
    );
  }
}
