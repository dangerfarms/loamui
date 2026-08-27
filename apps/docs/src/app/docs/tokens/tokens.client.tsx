"use client";

import { useEffect, useState } from "react";

type TokenGroup = {
  title: string;
  note: string;
  tokens: string[];
  swatch?: boolean;
  shadow?: boolean;
};

const GROUPS: TokenGroup[] = [
  {
    title: "Brand & status",
    note: "The colour decisions a theme makes. Primary is neutral (black/white) by default, the white-label starting point; accent is the chromatic flourish; success/danger/warning/info are the status hues; link and highlight round out the platform defaults.",
    tokens: [
      "--fui-color-primary",
      "--fui-color-accent",
      "--fui-color-success",
      "--fui-color-danger",
      "--fui-color-warning",
      "--fui-color-info",
      "--fui-color-link",
      "--fui-color-highlight",
    ],
    swatch: true,
  },
  {
    title: "Neutrals",
    note: "Surfaces, text and borders.",
    tokens: [
      "--fui-color-bg",
      "--fui-color-bg-subtle",
      "--fui-color-surface",
      "--fui-color-fg",
      "--fui-color-fg-strong",
      "--fui-color-fg-muted",
      "--fui-color-fg-dim",
      "--fui-color-line",
      "--fui-color-line-strong",
      "--fui-color-on-strong",
    ],
    swatch: true,
  },
  {
    title: "Derived",
    note: "Recipes, not decisions: soft tints, solid fills and rings computed from the hues. Rebrand --fui-color-primary and these follow.",
    tokens: [
      "--fui-color-primary-soft",
      "--fui-color-primary-strong",
      "--fui-color-danger-soft",
      "--fui-color-danger-strong",
      "--fui-color-surface-hover",
      "--fui-color-ring",
    ],
    swatch: true,
  },
  {
    title: "Fonts",
    note: "Two families a theme can swap (body and display), plus a monospace for code. System by default.",
    tokens: ["--fui-font", "--fui-font-display", "--fui-font-mono"],
  },
  {
    title: "Type scale",
    note: "Fluid clamp() values in container units: they respond to the nearest container, or the viewport without one.",
    tokens: [
      "--fui-text-xs",
      "--fui-text-sm",
      "--fui-text-md",
      "--fui-text-lg",
      "--fui-text-xl",
      "--fui-text-2xl",
      "--fui-text-3xl",
    ],
  },
  {
    title: "Spacing",
    note: "The same fluid construction; minimums are the fixed values, so nothing shrinks below them.",
    tokens: [
      "--fui-space-xs",
      "--fui-space-sm",
      "--fui-space-md",
      "--fui-space-lg",
      "--fui-space-xl",
    ],
  },
  {
    title: "Radius & motion",
    note: "Deliberately fixed: rounding and durations don't breathe with the viewport.",
    tokens: [
      "--fui-radius-sm",
      "--fui-radius-md",
      "--fui-radius-lg",
      "--fui-radius-xl",
      "--fui-radius-full",
      "--fui-duration-sm",
      "--fui-duration-md",
      "--fui-duration-lg",
      "--fui-ease",
      "--fui-ease-elastic",
    ],
  },
  {
    title: "Elevation",
    note: "Layered light-dark() shadows: a real drop in light; in dark the drop goes transparent and an inset top highlight carries the bevel, so the light source stays consistent.",
    tokens: ["--fui-shadow-sm", "--fui-shadow-raised", "--fui-shadow-md", "--fui-shadow-lg"],
    shadow: true,
  },
];

/**
 * The token table is measured, not transcribed: values are read live from
 * the loaded stylesheet with getComputedStyle, so the page cannot drift
 * from the shipped CSS.
 */
export function ComputedTokens() {
  const [values, setValues] = useState<Record<string, string>>();

  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const all: Record<string, string> = {};
    for (const g of GROUPS) {
      for (const t of g.tokens) {
        all[t] = cs.getPropertyValue(t).trim();
      }
    }
    setValues(all);
  }, []);

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      {GROUPS.map((g) => (
        <section key={g.title} style={{ minInlineSize: 0 }}>
          <h3 style={{ marginBlockEnd: "0.25rem" }}>{g.title}</h3>
          <p style={{ color: "var(--fui-color-fg-muted)", marginBlockEnd: "0.75rem" }}>{g.note}</p>
          <div
            style={{
              border: "1px solid var(--fui-color-line)",
              borderRadius: "var(--fui-radius-md)",
              overflow: "clip",
            }}
          >
            {g.tokens.map((t, i) => (
              <div
                key={t}
                style={{
                  alignItems: "center",
                  borderBlockStart: i > 0 ? "1px solid var(--fui-color-line)" : undefined,
                  display: "flex",
                  fontFamily: "var(--fui-font-mono)",
                  fontSize: "var(--fui-text-sm)",
                  gap: "0.75rem",
                  padding: "0.5rem 0.75rem",
                }}
              >
                {g.swatch && (
                  <span
                    aria-hidden
                    style={{
                      background: `var(${t})`,
                      blockSize: "1.25rem",
                      border: "1px solid var(--fui-color-line)",
                      borderRadius: "var(--fui-radius-sm)",
                      display: "inline-block",
                      flexShrink: 0,
                      inlineSize: "1.25rem",
                    }}
                  />
                )}
                {g.shadow && (
                  <span
                    aria-hidden
                    style={{
                      background: "var(--fui-color-surface)",
                      blockSize: "1.75rem",
                      borderRadius: "var(--fui-radius-sm)",
                      boxShadow: `var(${t})`,
                      display: "inline-block",
                      flexShrink: 0,
                      inlineSize: "1.75rem",
                    }}
                  />
                )}
                <span style={{ flexShrink: 0 }}>{t}</span>
                <span
                  style={{
                    color: "var(--fui-color-fg-muted)",
                    marginInlineStart: "auto",
                    minInlineSize: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={values?.[t]}
                >
                  {values?.[t] ?? "…"}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
      <p style={{ color: "var(--fui-color-fg-muted)", fontSize: "var(--fui-text-sm)" }}>
        Values are read live from the loaded stylesheet with getComputedStyle, in your current
        colour scheme; fluid values show their computed size at this viewport.
      </p>
    </div>
  );
}
