"use client";

import Link from "next/link";
import type { Composition } from "./types";
import { CATEGORY_ORDER } from "./manifest";
import { CodeBlock } from "@/renderer/CodeBlock";
import { Preview } from "@/renderer/Preview";
import gallery from "@/app/gallery.module.css";
import page from "@/app/[slug]/page.module.css";
import hero from "./hero";
import table_of_contents from "./table-of-contents";
import article_cards from "./article-cards";
import team from "./team";
import error_page from "./error-page";
import sign_in from "./sign-in";
import contact_form from "./contact-form";
import faq from "./faq";
import banner from "./banner";
import call_to_action from "./call-to-action";
import carousel from "./carousel";
import features from "./features";
import testimonials from "./testimonials";
import pricing from "./pricing";
import stats from "./stats";
import footer from "./footer";
import header from "./header";

/** Every composition, in gallery order. Add a file under src/content and list it here and in manifest.ts. */
const COMPOSITIONS: Composition[] = [
  hero,
  pricing,
  features,
  testimonials,
  carousel,
  call_to_action,
  banner,
  faq,
  team,
  error_page,
  contact_form,
  sign_in,
  header,
  footer,
  stats,
  article_cards,
  table_of_contents,
];

function bySlug(slug: string): Composition | undefined {
  return COMPOSITIONS.find((c) => c.slug === slug);
}

/** The gallery grid: a scaled live render of each composition's first demo. */
export function GalleryGrid() {
  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    items: COMPOSITIONS.filter((c) => c.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {groups.map((g) => (
        <section key={g.category} className={gallery.group}>
          <h2 className={gallery.groupTitle}>
            {g.category}{" "}
            <span className={gallery.count}>
              {g.items.length} {g.items.length === 1 ? "composition" : "compositions"}
            </span>
          </h2>
          <ul className={gallery.grid}>
            {g.items.map((item) => (
              <li key={item.slug} className={gallery.card}>
                {/* The thumbnail is a live render and may contain links, so it sits
                    beside the card link (inert), not inside it; the link's ::after
                    covers the whole card. */}
                <div className={gallery.thumb} aria-hidden inert>
                  <div className={gallery.thumbInner}>{item.demos[0]?.render()}</div>
                </div>
                <div className={gallery.cardBody}>
                  <Link href={`/${item.slug}`} className={gallery.cardLink}>
                    {item.name}
                  </Link>
                  <span className={gallery.cardDesc}>{item.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

/** A composition's page body: lead, demos, guidance and parts. */
export function CompositionView({ slug }: { slug: string }) {
  const comp = bySlug(slug);
  if (!comp) return null;
  return (
    <>
      <header className={page.head}>
        <Link href="/" className={page.back}>
          All compositions
        </Link>
        <span className="eyebrow">{comp.category}</span>
        <h1>{comp.name}</h1>
        <p className={page.lead}>{comp.lead}</p>
        <CodeBlock code={comp.importLine} />
      </header>

      <section className={page.section}>
        <h2>Usage</h2>
        {comp.demos.map((demo) => (
          <div key={demo.title} className={page.demo}>
            <h3>{demo.title}</h3>
            {demo.description && <p className={page.demoDesc}>{demo.description}</p>}
            <Preview code={demo.code}>{demo.render()}</Preview>
          </div>
        ))}
      </section>

      {(comp.whenToUse?.length || comp.whenNotToUse?.length) && (
        <section className={`${page.section} ${page.twoCol}`}>
          {comp.whenToUse?.length ? (
            <div>
              <h2>When to use it</h2>
              <ul>
                {comp.whenToUse.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {comp.whenNotToUse?.length ? (
            <div>
              <h2>When not to</h2>
              <ul>
                {comp.whenNotToUse.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      )}

      <section className={page.section}>
        <h2>Parts</h2>
        <dl className={page.parts}>
          {comp.parts.map((p) => (
            <div key={p.name}>
              <dt>
                <code>{p.name}</code>
              </dt>
              <dd>{p.description}</dd>
            </div>
          ))}
        </dl>
        <p className={page.note}>
          No size, variant or colour props: declare <code>--loam-context</code> on a region and the
          parts inside adapt. See the{" "}
          <a href="https://loamui.com/docs/contextualism/">Contextualism guide</a>.
        </p>
      </section>
    </>
  );
}
