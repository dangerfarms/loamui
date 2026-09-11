import { notFound, permanentRedirect } from "next/navigation";
import { recipeRouteParams, recipeDestination } from "@/examples/redirects";

export function generateStaticParams() {
  return recipeRouteParams();
}

export default async function LegacyRedirect({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const destination = recipeDestination(category, slug);
  if (!destination) notFound();
  permanentRedirect(destination);
}
