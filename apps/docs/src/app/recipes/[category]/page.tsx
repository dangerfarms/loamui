import { categoryRouteParams, categoryDestination } from "@/examples/redirects";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { EXAMPLE_CATEGORIES, exampleHref, examplesIn, getCategory } from "@/examples";
import { EXAMPLE_SOURCE } from "@/examples/generated-source";
import { ExamplesRail } from "@/renderer/examples-rail";
import { ExampleStage } from "@/renderer/examples-stage";
import { ExampleCodePanel } from "@/renderer/examples-code-panel";
import { ExampleCrumbs } from "@/renderer/examples-crumbs";
import { ExamplePager } from "@/renderer/examples-pager";
import "@/renderer/examples-page.css";

export function generateStaticParams() {
  return categoryRouteParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return { title: `${category.title} recipes`, description: category.blurb };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const destination = categoryDestination(slug);
  if (destination && destination !== `/recipes/${slug}`) permanentRedirect(destination);
  const category = getCategory(slug);
  if (!category) notFound();
  const items = examplesIn(category.slug);
  if (!items.length) notFound();

  // Previous and next among the categories that have recipes, in the
  // rail's order.
  const listed = EXAMPLE_CATEGORIES.filter((cat) => examplesIn(cat.slug).length > 0);
  const at = listed.findIndex((cat) => cat.slug === category.slug);
  const toLink = (cat?: (typeof listed)[number]) =>
    cat ? { href: `/recipes/${cat.slug}`, title: cat.title } : undefined;

  return (
    <div className="site-RecipePage">
      <header className="hero">
        <ExampleCrumbs category={category} />
        <h1 className="title">{category.title}</h1>
        <p className="lead">
          {category.blurb} {items.length} {items.length === 1 ? "recipe" : "recipes"}.
        </p>
      </header>
      <div className="shell">
        <aside className="aside">
          <ExamplesRail current={category.slug} />
        </aside>
        <div className="content">
          {items.map((e) => {
            const source = EXAMPLE_SOURCE[e.slug];
            return (
              <article key={e.slug} id={e.slug} className="entry">
                <div className="entryHead">
                  <h2 className="entryTitle">
                    <Link href={exampleHref(e)}>{e.meta.title}</Link>
                    <a
                      href={`#${e.slug}`}
                      className="anchor"
                      aria-label={`Link to ${e.meta.title}`}
                    >
                      #
                    </a>
                  </h2>
                  <p className="entryDesc">{e.meta.description}</p>
                </div>
                <ExampleStage title={e.meta.title} href={exampleHref(e)}>
                  <e.Example />
                </ExampleStage>
                {source && <ExampleCodePanel source={source} href={exampleHref(e)} />}
              </article>
            );
          })}
          <ExamplePager
            label="category"
            previous={toLink(listed[at - 1])}
            next={toLink(listed[at + 1])}
          />
        </div>
      </div>
    </div>
  );
}
