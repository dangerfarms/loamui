import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@loamui/core";
import { EXAMPLES, exampleHref, examplesIn, getCategory, getExample } from "@/examples";
import { EXAMPLE_SOURCE } from "@/examples/generated-source";
import { COMPONENTS } from "@/site/nav";
import { ExampleStage } from "@/renderer/examples-stage";
import { ExampleCode } from "@/renderer/examples-code";
import { ExamplePillars } from "@/renderer/examples-pillars";
import { ExampleCrumbs } from "@/renderer/examples-crumbs";
import { ExamplePager } from "@/renderer/examples-pager";
import c from "@/renderer/examples-page.module.css";
import md from "@/site/MarkdownLink.module.css";

export function generateStaticParams() {
  return EXAMPLES.map((e) => ({ category: e.category, slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const example = getExample(category, slug);
  if (!example) return {};
  return { title: `${example.meta.title} example`, description: example.meta.description };
}

/** The docs page for a core component, by its export name. */
function docHref(name: string): string | undefined {
  const item = COMPONENTS.find((comp) => comp.name === name);
  return item ? `/docs/components/${item.slug}` : undefined;
}

export default async function ExamplePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;
  const example = getExample(categorySlug, slug);
  const category = getCategory(categorySlug);
  const source = EXAMPLE_SOURCE[slug];
  if (!example || !category || !source) notFound();
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // Previous and next within the category, in its display order.
  const siblings = examplesIn(categorySlug);
  const at = siblings.findIndex((e) => e.slug === slug);
  const toLink = (e?: (typeof siblings)[number]) =>
    e ? { href: exampleHref(e), title: e.meta.title } : undefined;

  return (
    <div className={c.page}>
      <article className={c.single}>
        <header className={c.singleHead}>
          <div className={c.crumbRow}>
            <ExampleCrumbs category={category} title={example.meta.title} />
            <a
              className={md.link}
              href={`${base}/examples/${categorySlug}/${slug}.md`}
              title="Read this example as Markdown"
            >
              View as Markdown
            </a>
          </div>
          <h1 className={c.title}>{example.meta.title}</h1>
          <p className={c.lead}>{example.meta.description}</p>
        </header>

        <ExampleStage title={example.meta.title}>
          <example.Example />
        </ExampleStage>

        <section className={c.section} aria-labelledby="code">
          <h2 id="code" className={c.h2}>
            Code
          </h2>
          <p className={c.sectionNote}>
            Two files, exactly as the preview runs them. Copy both into your project side by side:
            the component imports the stylesheet, and both use only what <code>@loamui/core</code>{" "}
            already ships.
          </p>
          <ExampleCode source={source} />
        </section>

        <section className={c.section} aria-labelledby="uses">
          <h2 id="uses" className={c.h2}>
            Uses
          </h2>
          {example.meta.uses.length > 0 ? (
            <ul className={c.uses}>
              {example.meta.uses.map((name) => {
                const href = docHref(name);
                return (
                  <li key={name}>
                    {href ? (
                      <Badge render={<Link href={href} />}>{name}</Badge>
                    ) : (
                      <Badge>{name}</Badge>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={c.usesNone}>
              No components: the <Link href="/docs/element-styles">element styles</Link> and the
              tokens carry this one on their own.
            </p>
          )}
        </section>

        <section className={c.section} aria-labelledby="pillars">
          <h2 id="pillars" className={c.h2}>
            Built to the pillars
          </h2>
          <ExamplePillars notes={example.meta.notes} />
        </section>

        <ExamplePager
          label="example"
          previous={toLink(siblings[at - 1])}
          next={toLink(siblings[at + 1])}
        />
      </article>
    </div>
  );
}
