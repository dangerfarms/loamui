import { recipeRouteParams, recipeDestination } from "@/examples/redirects";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Badge } from "@loamui/core";
import { exampleHref, examplesIn, getCategory, getExample } from "@/examples";
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
  return recipeRouteParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const example = getExample(category, slug);
  if (!example) return {};
  return { title: `${example.meta.title} recipe`, description: example.meta.description };
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
  const destination = recipeDestination(categorySlug, slug);
  if (destination && destination !== `/recipes/${categorySlug}/${slug}`)
    permanentRedirect(destination);
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
              href={`${base}/recipes/${categorySlug}/${slug}.md`}
              title="Read this recipe as Markdown"
            >
              View as Markdown
            </a>
          </div>
          <h1 className={c.title}>{example.meta.title}</h1>
          <p className={c.lead}>{example.meta.description}</p>
        </header>

        {example.meta.whenToUse && <p className={c.sectionNote}>{example.meta.whenToUse}</p>}

        <ExampleStage title={example.meta.title}>
          <example.Example />
        </ExampleStage>

        <section className={c.section} aria-labelledby="code">
          <h2 id="code" className={c.h2}>
            Code
          </h2>
          <p className={c.sectionNote}>
            Copy <code>Example.tsx</code> and <code>example.css</code> side by side into a React 19
            project. Install <code>@loamui/core</code> and load <code>@loamui/core/styles.css</code>{" "}
            once at your application root, as shown in the{" "}
            <Link href="/docs/installation">installation guide</Link>. The component imports its own
            stylesheet.
          </p>
          <p className={c.sectionNote}>
            {example.meta.integration ??
              "Replace the sample content and images with your own. Links and form actions illustrate application routes; provide those destinations and connect any action buttons to your application before shipping."}
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
            Design decisions
          </h2>
          <p className={c.sectionNote}>
            How this recipe applies the <Link href="/docs">five pillars</Link>. These notes explain
            the design. The included tests cover structure and selected interactions; check
            contrast, keyboard behavior and assistive technology support in your application.
          </p>
          <ExamplePillars notes={example.meta.notes} />
        </section>

        <ExamplePager
          label="recipe"
          previous={toLink(siblings[at - 1])}
          next={toLink(siblings[at + 1])}
        />
      </article>
    </div>
  );
}
