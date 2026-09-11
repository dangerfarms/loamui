import { describe, expect, it } from "vitest";
import { EXAMPLE_META, examplesByCategory } from "./catalog";
import { EXAMPLE_PREVIEWS } from "./generated-previews";
import { EXAMPLE_SOURCE } from "./generated-source";
import {
  RECIPE_REDIRECTS,
  recipeDestination,
  categoryDestination,
  recipeRouteParams,
} from "./redirects";
import { PUBLISHED_RECIPES } from "./recipes";

describe("published recipes", () => {
  it("publishes only the selected identities, previews and copyable sources", () => {
    expect(EXAMPLE_META.map((entry) => `${entry.category}/${entry.slug}`).sort()).toEqual(
      [...PUBLISHED_RECIPES].sort(),
    );
    const slugs = EXAMPLE_META.map((entry) => entry.slug).sort();
    expect(Object.keys(EXAMPLE_PREVIEWS).sort()).toEqual(slugs);
    expect(Object.keys(EXAMPLE_SOURCE).sort()).toEqual(slugs);
    expect(examplesByCategory().every((group) => group.items.length > 0)).toBe(true);
  });
  it("keeps the curated categories and selection guidance available", () => {
    expect(examplesByCategory().map(({ category }) => category.title)).toEqual([
      "Heroes",
      "Banners",
      "Cards",
      "Media",
      "Grids",
      "Content",
      "Forms",
    ]);
    expect(EXAMPLE_META).toHaveLength(15);
    for (const entry of EXAMPLE_META) expect(entry.meta.whenToUse?.trim()).toBeTruthy();
  });

  it("resolves old bookmarks directly to a published recipe and rejects retired details", () => {
    for (const [old, target] of Object.entries(RECIPE_REDIRECTS)) {
      const [category, slug] = old.split("/");
      expect(PUBLISHED_RECIPES).toContain(target);
      expect(recipeDestination(category!, slug!)).toBe(`/recipes/${target}`);
      expect(recipeRouteParams()).toContainEqual({ category, slug });
    }
    expect(recipeDestination("preferences", "colour-scheme-switcher")).toBeUndefined();
    expect(recipeDestination("forms", "scheme-toggle")).toBeUndefined();
    expect(categoryDestination("preferences")).toBeUndefined();
    expect(recipeDestination("app-cards", "card-icon-features")).toBeUndefined();
    expect(recipeDestination("grids", "grid-leading-item")).toBeUndefined();
    expect(categoryDestination("page-sections")).toBe("/recipes");
    expect(categoryDestination("users")).toBe("/recipes/cards");
    expect(categoryDestination("forms")).toBe("/recipes/forms");
    expect(categoryDestination("missing")).toBeUndefined();
  });
});
