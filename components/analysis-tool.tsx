"use client";

import { useState } from "react";
import { Sparkles, Loader2, Search } from "lucide-react";

export function AnalysisTool() {
  const [target, setTarget] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    if (!target.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `As a cybersecurity intelligence analyst, analyze the following target or threat vector: "${target}". 
          Provide a structured assessment including:
          1. Potential vulnerabilities or exposure points.
          2. Recommended reconnaissance steps (Google Dorks, OSINT).
          3. Mitigation strategies.
          Keep it professional and concise.`
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || "Failed to connect to the intelligence engine.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panelCard">
      <div className="sectionHeading" style={{ marginBottom: "20px" }}>
        <p className="eyebrow">AI Analysis</p>
        <h2 style={{ fontSize: "1.4rem" }}>Rapid Intelligence Engine</h2>
        <p style={{ fontSize: "0.9rem" }}>Input a domain, email, or threat pattern for instant guided recon strategy.</p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text"
            placeholder="target-domain.com or suspicious-email@host.com"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            style={{
              width: "100%",
              padding: "12px 14px",
              paddingLeft: "42px",
              borderRadius: "14px",
              border: "1px solid var(--line)",
              background: "rgba(3, 11, 8, 0.88)",
              color: "var(--text)"
            }}
          />
          <Search 
            size={18} 
            style={{ 
              position: "absolute", 
              left: "14px", 
              top: "50%", 
              transform: "translateY(-50%)", 
              color: "var(--muted)" 
            }} 
          />
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading || !target.trim()}
          className="primaryButton"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          Analyze
        </button>
      </div>

      {error && (
        <div className="authError" style={{ marginTop: "12px" }}>
          {error}
        </div>
      )}

      {result && (
        <div 
          className="statusNote" 
          style={{ 
            marginTop: "20px", 
            whiteSpace: "pre-wrap", 
            fontSize: "0.92rem", 
            lineHeight: "1.6",
            maxHeight: "400px",
            overflowY: "auto",
            padding: "20px",
            border: "1px solid var(--line-strong)",
            background: "rgba(87, 255, 189, 0.03)"
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}
