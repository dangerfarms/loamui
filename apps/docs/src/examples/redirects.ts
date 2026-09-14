import { EXAMPLE_META, examplesByCategory } from "./catalog";

// Keep existing bookmarks working after the Recipes taxonomy changed.
export const RECIPE_REDIRECTS: Record<string, string> = {
  "page-sections/contact-us-with-details": "forms/contact-us-with-details",
  "page-sections/hero-with-image": "heroes/hero-with-image",
  "page-sections/hero-background-image": "heroes/hero-background-image",
  "page-sections/banner-with-image": "banners/banner-with-image",
  "blog/card-background-image": "banners/banner-background-image",
  "blog/article-card": "cards/article-card",
  "users/user-card": "cards/profile-card",
  "carousels/card-with-carousel": "cards/gallery-card",
  "carousels/carousel-with-cards": "media/article-carousel",
  "page-sections/image-comparison": "media/image-comparison",
  "faq/faq-with-background": "content/faq",
  "page-sections/timeline": "content/timeline",
};

export const CATEGORY_REDIRECTS: Record<string, string> = {
  "page-sections": "/recipes",
  "app-cards": "/recipes/cards",
  blog: "/recipes/cards",
  users: "/recipes/cards",
  carousels: "/recipes/media",
  faq: "/recipes/content",
};

export function recipeRouteParams() {
  const keys = new Set([
    ...EXAMPLE_META.map(({ category, slug }) => `${category}/${slug}`),
    ...Object.keys(RECIPE_REDIRECTS),
  ]);
  return [...keys].map((key) => {
    const separator = key.indexOf("/");
    return { category: key.slice(0, separator), slug: key.slice(separator + 1) };
  });
}

export function recipeDestination(category: string, slug: string): string | undefined {
  const key = `${category}/${slug}`;
  const destination = RECIPE_REDIRECTS[key] ?? key;
  return EXAMPLE_META.some((entry) => `${entry.category}/${entry.slug}` === destination)
    ? `/recipes/${destination}`
    : undefined;
}

export function categoryRouteParams() {
  return [
    ...new Set([
      ...examplesByCategory().map(({ category }) => category.slug),
      ...Object.keys(CATEGORY_REDIRECTS),
    ]),
  ].map((category) => ({ category }));
}

export function categoryDestination(category: string): string | undefined {
  if (Object.hasOwn(CATEGORY_REDIRECTS, category)) return CATEGORY_REDIRECTS[category];
  return examplesByCategory().some((group) => group.category.slug === category)
    ? `/recipes/${category}`
    : undefined;
}
