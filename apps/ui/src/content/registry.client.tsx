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
import article_card from "./article-card";
import person from "./person";
import error_page from "./error-page";
import account_form from "./account-form";
import contact_form from "./contact-form";
import banner from "./banner";
import call_to_action from "./call-to-action";
import carousel from "./carousel";
import feature from "./feature";
import testimonial from "./testimonial";
import stats from "./stats";
import footer from "./footer";
import header from "./header";
import product_card from "./product-card";
import cart_line from "./cart-line";
import comment from "./comment";
import byline from "./byline";
import selectable_card from "./selectable-card";
import password_field from "./password-field";
import user_menu from "./user-menu";
import address_fields from "./address-fields";
import side_nav from "./side-nav";
import setting_row from "./setting-row";
import tag_list from "./tag-list";
import cookie_banner from "./cookie-banner";
import empty_state from "./empty-state";
import summary_list from "./summary-list";
import task_list from "./task-list";
import contact_details from "./contact-details";
import social_links from "./social-links";
import embed from "./embed";
import image_comparison from "./image-comparison";
import galleryComposition from "./gallery";
import logo_wall from "./logo-wall";
import steps from "./steps";

/** Every composition, in gallery order. Add a file under src/content and list it here and in manifest.ts. */
const COMPOSITIONS: Composition[] = [
  hero,
  feature,
  testimonial,
  carousel,
  call_to_action,
  banner,
  person,
  error_page,
  contact_form,
  account_form,
  header,
  footer,
  stats,
  article_card,
  table_of_contents,
  steps,
  contact_details,
  social_links,
  embed,
  image_comparison,
  galleryComposition,
  logo_wall,
  task_list,
  summary_list,
  empty_state,
  cookie_banner,
  tag_list,
  setting_row,
  side_nav,
  address_fields,
  user_menu,
  password_field,
  selectable_card,
  byline,
  comment,
  cart_line,
  product_card,
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
