"use client";

import Link from "next/link";
import { SignpostLink } from "@loamui/core";
import { EXAMPLE_META } from "@/examples/generated-meta";
import HeroWithImage from "@/examples/heroes/hero-with-image/Example";
import ImageComparison from "@/examples/media/image-comparison/Example";
import Subgrid from "@/examples/grids/grid-subgrid/Example";
import { LazyThumb } from "./examples-thumb";
import classes from "./examples-teaser.module.css";

/**
 * Three recipes picked by hand, imported one by one so the home page
 * carries three components and not the whole registry.
 */
const PICKS = [
  { category: "heroes", slug: "hero-with-image", Example: HeroWithImage },
  { category: "media", slug: "image-comparison", Example: ImageComparison },
  { category: "grids", slug: "grid-subgrid", Example: Subgrid },
];

/** The home page's pointer to the recipes: three live previews and the way in. */
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
              <Link href={`/recipes/${pick.category}/${pick.slug}`} className={classes.link}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className={classes.cta}>
        <SignpostLink render={<Link href="/recipes" />}>Browse all {total} recipes</SignpostLink>
      </p>
    </>
  );
}
