import { notFound } from "next/navigation";
import { MANIFEST, metaBySlug } from "@/content/manifest";
import { CompositionView } from "@/content/registry.client";
import c from "./page.module.css";

export function generateStaticParams() {
  return MANIFEST.map((comp) => ({ slug: comp.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const meta = metaBySlug((await params).slug);
  return meta ? { title: meta.name, description: meta.description } : {};
}

export default async function CompositionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!metaBySlug(slug)) notFound();
  return (
    <article className={`container ${c.page}`}>
      <CompositionView slug={slug} />
    </article>
  );
}
