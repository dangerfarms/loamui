import Link from "next/link";
import { Button, SignpostLink } from "@farmui/core";
import { CodeBlock } from "@/renderer/CodeBlock";
import { COMPONENTS, componentsByCategory } from "@/site/nav";
import { BoltIcon, CheckIcon, GitHubIcon } from "@/site/Icons";
import { HeroShowcase, InstallSnippet } from "./home.client";
import c from "./home.module.css";

const STATS = [
  { num: `${COMPONENTS.length}`, label: "Components, and no more" },
  { num: "3", label: "Primitives" },
  { num: "0", label: "Runtime dependencies" },
  { num: "0kb", label: "Runtime CSS-in-JS" },
];

const TENETS = [
  {
    title: "Modern APIs, features and elements",
    body: (
      <>
        Real <code>&lt;dialog&gt;</code>, <code>&lt;details&gt;</code>, the Popover API, anchor
        positioning, container queries. The platform&rsquo;s own widgets, styled, not
        reimplementations of them.
      </>
    ),
  },
  {
    title: "Progressive enhancement",
    body: (
      <>
        Everything works before and without JavaScript; animation and enhancement are layered on
        top, inside <code>prefers-reduced-motion: no-preference</code> and <code>@supports</code>.
      </>
    ),
  },
  {
    title: "Baseline browser support",
    body: (
      <>
        Features are adopted from Baseline, and support claims come from compatibility data, not
        optimism.
      </>
    ),
  },
];

const PRIMITIVES = [
  {
    title: "Tokens",
    href: "/docs/tokens",
    body: "A handful of semantic decisions (a small palette of colours, a neutral ramp, fluid scales), and everything else derived by recipe. Not thousands of values, but a surface small enough to audit.",
  },
  {
    title: "Element styles",
    href: "/docs/element-styles",
    body: "Enhanced default styles for native HTML, page-wide: responsive, accessible, and respecting the reader's light or dark preference. Plain markup is presentable before any component appears.",
  },
  {
    title: "Components",
    href: "/docs/components",
    body: "A small set of carefully chosen, contextually styled components, not hundreds. Your agent builds exactly what you need on the two primitives beneath.",
  },
];

const UX_RULES = [
  "Form fields read label, description, error, control, so the fix is read before the answer is given",
  "Optional is marked in words, never with asterisks",
  "Buttons act; links go, and the docs hold the line between them",
  "A switch acts now; a checkbox acts on submit",
  "Disclosure exists to shorten a long page, not to hide what everyone needs",
];

const GATES = [
  "Stylelint, every rule on",
  "Contrast audit reads the real stylesheets",
  "axe on every component",
  "Interaction tests on real markup",
  "TypeScript-first",
  "Zero runtime",
];

const FARMUI_CODE = `import { Button, SignpostLink } from "@farmui/core";

<Button>Save changes</Button>;`;

const TAILWIND_CODE = `// shadcn/ui + Tailwind: utilities inlined on every element
<button
  className="inline-flex items-center justify-center gap-2
    whitespace-nowrap rounded-md text-sm font-medium
    transition-colors focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-ring
    disabled:pointer-events-none disabled:opacity-50
    bg-primary/10 text-primary hover:bg-primary/20 h-10 px-4"
>
  Save changes
</button>;`;

const TECHNIQUES = [
  {
    name: "light-dark()",
    desc: "One value, both themes: no duplicated theme objects.",
    code: "color: light-dark(#1a1a1a, #fafafa);",
  },
  {
    name: "color-mix()",
    desc: "Derive every hover and tint from a single token.",
    code: "color-mix(\n  in oklab, var(--_color), #0000\n)",
  },
  {
    name: "@container",
    desc: "Components respond to their container, not the viewport.",
    code: "@container (width > 20rem) { … }",
  },
  {
    name: ":has()",
    desc: "Style a parent from the state of its children.",
    code: ".field:has(:invalid) { border-color: red }",
  },
  {
    name: "logical properties",
    desc: "RTL-ready by default, with no hardcoded left / right.",
    code: "padding-inline: 1rem; margin-block: 0.5rem;",
  },
  {
    name: "@layer",
    desc: "A predictable cascade: no specificity wars, no !important.",
    code: "@layer farmui.components { … }",
  },
  {
    name: "clamp()",
    desc: "Fluid type and spacing without a single media query.",
    code: "font-size: clamp(1rem, 0.93rem + 0.35cqi, 1.25rem);",
  },
  {
    name: "@scope",
    desc: "Encapsulation in the browser, so parts keep plain names.",
    code: "@scope (.fui-Field) { label { … } }",
  },
];

export default function HomePage() {
  const categories = componentsByCategory();

  return (
    <>
      {/* Hero */}
      <section className={c.hero}>
        <div className={c.heroBg} />
        <div className={`container ${c.heroGrid}`}>
          <div>
            <span className={c.badgeRow}>
              <span className={c.badgePill}>v1.0</span>
              Three primitives, deterministically gatekept
            </span>
            <h1 className={c.title}>
              Modern UI primitives for <span className="brandText">agent-assisted developers.</span>
            </h1>
            <p className={c.subtitle}>
              Contextual tokens, element styles and React components, built on Google&rsquo;s Modern
              Web Guidelines for quickly building bespoke UIs that are accessible, adaptable and
              fast.
            </p>
            <div className={c.ctaRow}>
              <SignpostLink render={<Link href="/docs" />}>Get started</SignpostLink>
              <a
                href="https://github.com/dangerfarms/farmui"
                target="_blank"
                rel="noreferrer"
                className={c.plainLink}
              >
                <GitHubIcon width={16} height={16} /> Star on GitHub
              </a>
            </div>
            <InstallSnippet />
          </div>
          <div className={c.heroArt}>
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container">
        <div className={c.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={c.stat}>
              <div className={`${c.statNum} brandText`}>{s.num}</div>
              <div className={c.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Web Guidance */}
      <section className={`container ${c.section}`}>
        <div className={`${c.sectionHead} ${c.center}`}>
          <span className="eyebrow">
            <BoltIcon width={14} height={14} /> The foundation
          </span>
          <h2 className={c.sectionTitle}>Built on Google&rsquo;s Modern Web Guidance.</h2>
          <p className={c.sectionSub}>
            Every primitive follows the Chrome team&rsquo;s guidance for the modern web. That is why
            interfaces built with FarmUI are fast and accessible, a combination no other library
            offers. Three tenets run through everything:
          </p>
        </div>
        <div className={c.features}>
          {TENETS.map((t) => (
            <div key={t.title} className={c.feature}>
              <span className={c.featureIcon} aria-hidden>
                <BoltIcon width={18} height={18} />
              </span>
              <h3 className={c.featureTitle}>{t.title}</h3>
              <p className={c.featureText}>{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The three primitives */}
      <section className={`container ${c.section}`}>
        <div className={`${c.sectionHead} ${c.center}`}>
          <span className="eyebrow">Three primitives</span>
          <h2 className={c.sectionTitle}>Tokens. Element styles. Components.</h2>
          <p className={c.sectionSub}>
            Tokens and element styles matter as much as the components: they are what agents build
            downstream components and whole apps from. All three ship in one stylesheet.
          </p>
        </div>
        <div className={c.cats}>
          {PRIMITIVES.map((p) => (
            <Link key={p.title} href={p.href} className={c.cat}>
              <div className={c.catTitle}>{p.title}</div>
              <div className={c.catItems}>{p.body}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contextualism */}
      <section className={`container ${c.section}`}>
        <div className={c.split}>
          <div>
            <span className="eyebrow">The paradigm shift</span>
            <h2 className={c.sectionTitle}>Context decides, props don&rsquo;t.</h2>
            <p className={c.sectionSub}>
              Components carry no size, variant or colour props. A region declares what it means (
              <code>--fui-context</code>) and components inside adopt it; a container&rsquo;s width
              decides how components size. Drop components on a page and they fit. The{" "}
              <Link href="/docs/contextualism">Contextualism guide</Link> alone is enough for an
              agent to use it.
            </p>
            <ul className={c.splitList}>
              {[
                "One region declaration recolours buttons, checkboxes, focus rings, selection",
                "Fluid tokens size controls to their container, with no size props",
                "Width is the parent's layout: rows shrink-wrap, stacks stretch",
              ].map((item) => (
                <li key={item} className={c.splitItem}>
                  <span className={c.splitCheck} aria-hidden>
                    <CheckIcon width={13} height={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <CodeBlock
            language="css"
            code={`/* a named region declares its meaning */
.danger-zone {
  --fui-context: danger;
}

/* every FarmUI component inside adopts it:
   buttons, checked states, carets, focus
   rings. No props, no wrappers */`}
          />
        </div>
      </section>

      {/* UX best practice */}
      <section className={`container ${c.section}`}>
        <div className={`${c.sectionHead} ${c.center}`}>
          <span className="eyebrow">Distilled UX practice</span>
          <h2 className={c.sectionTitle}>The hard-earned rules, already in the components.</h2>
          <p className={c.sectionSub}>
            Steeped in UX best practices. Every component page says when to use it, when not to, and
            why, so the judgment ships with the code.
          </p>
        </div>
        <ul className={c.shouts}>
          {UX_RULES.map((s) => (
            <li key={s} className={c.shout}>
              <CheckIcon width={13} height={13} /> {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Gatekeeping */}
      <section className={`container ${c.section}`}>
        <div className={c.split}>
          <div>
            <span className="eyebrow">Deterministic gatekeeping</span>
            <h2 className={c.sectionTitle}>
              Quality that doesn&rsquo;t depend on who wrote the code.
            </h2>
            <p className={c.sectionSub}>
              Agent-assisted development needs gates, not vibes. FarmUI&rsquo;s quality bar is
              enforced by deterministic tooling: a stylelint config with every rule on, a contrast
              audit that reads the colour recipes out of the real stylesheets, and axe and
              interaction tests on every component. The same gates run for human and agent alike.
            </p>
            <ul className={c.splitList}>
              {GATES.map((item) => (
                <li key={item} className={c.splitItem}>
                  <span className={c.splitCheck} aria-hidden>
                    <CheckIcon width={13} height={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <CodeBlock
            language="css"
            code={`/* the audit reads these weights from the
   stylesheet and asserts every derived
   pairing holds its contrast. Change a
   recipe and CI tells you what broke */
--fui-color-primary-strong: light-dark(
  color-mix(in oklab, var(--fui-color-primary),
    oklch(0% 0 0deg) 22%),
  var(--fui-color-primary)
);`}
          />
        </div>
      </section>

      {/* Composition */}
      <section className={`container ${c.section}`}>
        <div className={c.split}>
          <div>
            <span className="eyebrow">Composition</span>
            <h2 className={c.sectionTitle}>Compose, don&rsquo;t configure.</h2>
            <p className={c.sectionSub}>
              Inspired by Base UI&rsquo;s composition architecture: compound components expose their
              parts, element substitution goes through <code>render</code>, and icons are detected
              children, not slot props. Bespoke variants are compositions in your codebase, not
              configuration in the library.
            </p>
            <ul className={c.splitList}>
              {[
                "Parts, not prop soup: Modal.Root, Modal.Trigger, Modal.Popup",
                "render swaps the element, keeps the wiring",
                "Form controls self-wire from the surrounding Field",
              ].map((item) => (
                <li key={item} className={c.splitItem}>
                  <span className={c.splitCheck} aria-hidden>
                    <CheckIcon width={13} height={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <CodeBlock
            code={`<Field.Root>
  <Field.Label>Work email</Field.Label>
  <Field.Description>We never share it.</Field.Description>
  <Field.Error>{errors.email}</Field.Error>
  <Input type="email" />  {/* self-wires */}
</Field.Root>`}
          />
        </div>
      </section>

      {/* Comparison */}
      <section className={`container ${c.section}`}>
        <div className={`${c.sectionHead} ${c.center}`}>
          <span className="eyebrow">See the difference</span>
          <h2 className={c.sectionTitle}>Same button. Cleaner everything.</h2>
          <p className={c.sectionSub}>
            FarmUI keeps styling in one shared, cacheable stylesheet, so your markup stays readable.
            Utility frameworks inline dozens of classes onto every element; runtime CSS-in-JS
            serializes styles on each render.
          </p>
        </div>
        <div className={c.compare}>
          <div className={c.compareCol} data-good>
            <div className={c.compareHead}>
              <span className={c.compareTag}>FarmUI</span>
              <Button>Save changes</Button>
            </div>
            <CodeBlock code={FARMUI_CODE} />
            <p className={c.compareNote}>
              One prop. Styles live in shared CSS: <strong>0&nbsp;kb</strong> runtime, works with
              any build tool.
            </p>
          </div>
          <div className={c.compareCol}>
            <div className={c.compareHead}>
              <span className={c.compareTag} data-alt>
                shadcn / Tailwind
              </span>
              <button className={c.rawBtn}>Save changes</button>
            </div>
            <CodeBlock code={TAILWIND_CODE} language="jsx" />
            <p className={c.compareNote}>
              ~15 utility classes on the element, repeated everywhere, plus a build step to generate
              them.
            </p>
          </div>
        </div>
      </section>

      {/* Modern CSS techniques */}
      <section className={`container ${c.section}`}>
        <div className={`${c.sectionHead} ${c.center}`}>
          <span className="eyebrow">Under the hood</span>
          <h2 className={c.sectionTitle}>Modern CSS, put to work.</h2>
          <p className={c.sectionSub}>
            No abstractions over the platform: FarmUI ships the same modern CSS features you&rsquo;d
            reach for by hand, so nothing runs at runtime.
          </p>
        </div>
        <ul className={c.tech}>
          {TECHNIQUES.map((t) => (
            <li key={t.name} className={c.techCard}>
              <code className={c.techName}>{t.name}</code>
              <p className={c.techDesc}>{t.desc}</p>
              <pre className={c.techCode}>{t.code}</pre>
            </li>
          ))}
        </ul>
      </section>

      {/* Component categories */}
      <section className={`container ${c.section}`}>
        <div className={`${c.sectionHead} ${c.center}`}>
          <span className="eyebrow">The library</span>
          <h2 className={c.sectionTitle}>{COMPONENTS.length} components, ready to ship.</h2>
          <p className={c.sectionSub}>
            Inputs, data display, feedback, disclosures and navigation, accessible and themeable out
            of the box.
          </p>
        </div>
        <div className={c.cats}>
          {categories.map((cat) => (
            <Link
              key={cat.category}
              href={`/docs/components/${cat.items[0]?.slug ?? "button"}`}
              className={c.cat}
            >
              <div className={c.catTitle}>{cat.category}</div>
              <div className={c.catItems}>{cat.items.map((i) => i.name).join(" · ")}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container">
        <div className={c.cta}>
          <h2 className={c.ctaTitle}>Start building</h2>
          <p className={c.ctaSub}>
            Install the package, import one stylesheet, and start with any component.
          </p>
          <div className={c.ctaRowCenter}>
            <SignpostLink render={<Link href="/docs" />}>Read the docs</SignpostLink>
            <Link href="/docs/components/button" className={c.plainLink}>
              Browse components
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
