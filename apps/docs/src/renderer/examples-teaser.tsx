"use client";

import Link from "next/link";
import { SignpostLink } from "@loamui/core";
import { EXAMPLE_META } from "@/examples/generated-meta";
import HeroWithImage from "@/examples/page-sections/hero-with-image/Example";
import SignIn from "@/examples/forms/sign-in/Example";
import PricingTable from "@/examples/commerce/pricing-table/Example";
import { LazyThumb } from "./examples-thumb";
import classes from "./examples-teaser.module.css";

/**
 * Three examples picked by hand, imported one by one so the home page
 * carries three components and not the whole registry.
 */
const PICKS = [
  { category: "page-sections", slug: "hero-with-image", Example: HeroWithImage },
  { category: "forms", slug: "sign-in", Example: SignIn },
  { category: "commerce", slug: "pricing-table", Example: PricingTable },
];

/** The home page's pointer to the examples: three live previews and the way in. */
export function ExamplesTeaser() {
  const total = EXAMPLE_META.length;
  return (
    <>
      <ul className={classes.grid}>
        {PICKS.map((pick) => {
          const title = EXAMPLE_META.find((e) => e.slug === pick.slug)?.meta.title ?? pick.slug;
          return (
            <li key={pick.slug} className={classes.card}>
              <LazyThumb className={classes.thumb}>
                <div className={classes.thumbInner}>
                  <pick.Example />
                </div>
              </LazyThumb>
              <Link href={`/examples/${pick.category}/${pick.slug}`} className={classes.link}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className={classes.cta}>
        <SignpostLink render={<Link href="/examples" />}>Browse all {total} examples</SignpostLink>
      </p>
    </>
  );
}
