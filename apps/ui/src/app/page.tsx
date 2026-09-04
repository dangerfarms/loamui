import { GalleryGrid } from "@/content/registry.client";
import { MANIFEST } from "@/content/manifest";
import c from "./gallery.module.css";

export default function GalleryPage() {
  return (
    <div className="container">
      <section className={c.intro}>
        <span className="eyebrow">@loamui/ui</span>
        <h1>Compositions built from the primitives.</h1>
        <p className={c.lede}>
          Ready-made sections assembled from @loamui/core: tokens, element styles and the 33
          components. Install the package and compose the parts, or copy the code into your own
          codebase. Nothing here adds a component to core; every composition is what your agent
          could build from the primitives, done once and checked.
        </p>
        <div className={c.install}>
          <span className={c.prompt}>$</span>
          <code>pnpm add @loamui/core @loamui/ui</code>
        </div>
      </section>

      <GalleryGrid />

      <p className={c.foot}>
        {MANIFEST.length} {MANIFEST.length === 1 ? "composition" : "compositions"} so far. Missing
        one? Build it from the primitives with the{" "}
        <a href="https://loamui.com/docs/composing/">Composing guide</a>, then propose it.
      </p>
    </div>
  );
}
