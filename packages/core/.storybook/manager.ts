import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

// Brand the manager chrome as LoamUI. The accent mirrors --loam-color-accent
// (a deep violet); the type stack matches the library's system-font default.
const loam = create({
  base: "light",
  brandTitle: "LoamUI",
  brandUrl: "https://github.com/dangerfarms/loamui",
  brandTarget: "_blank",
  colorPrimary: "#6d28d9",
  colorSecondary: "#6d28d9",
  fontBase: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontCode: 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace',
});

addons.setConfig({ theme: loam });
