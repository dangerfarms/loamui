import type { Preview, Decorator } from "@storybook/react-vite";
import { useEffect } from "react";

// The stylesheet entry orchestrates everything: layer order, tokens, reset,
// element defaults, and layered imports of every component's CSS.
import "../src/styles.css";

const withTheme: Decorator = (Story, ctx) => {
  const theme = (ctx.globals.theme as string) ?? "light";
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return (
    <div
      style={{
        background: "var(--loam-color-bg)",
        color: "var(--loam-color-fg)",
        fontFamily: "var(--loam-font)",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color scheme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "contrast",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    // Fail stories (and the test run) on axe violations.
    a11y: { test: "error" },
    options: {
      // Foundations reads as a learning path (identity → primitives →
      // contextualism → layout → a11y); the rest stay grouped by role.
      storySort: {
        order: [
          "Foundations",
          [
            "Introduction",
            "Principles",
            "Tokens",
            "Element styles",
            "Typography",
            "Contextualism",
            "Contexts",
            "Layout",
            "Accessibility",
          ],
          "Inputs",
          "Data display",
          "Feedback",
          "Navigation",
          "Overlays",
          "Layout",
          "*",
        ],
      },
    },
  },
};

export default preview;
