import { notFound, permanentRedirect } from "next/navigation";
import { categoryRouteParams, categoryDestination } from "@/examples/redirects";

export function generateStaticParams() {
  return categoryRouteParams();
}

export default async function LegacyRedirect({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const destination = categoryDestination(category);
  if (!destination) notFound();
  permanentRedirect(destination);
}
