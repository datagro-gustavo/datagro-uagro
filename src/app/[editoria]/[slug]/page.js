import { SectionNews } from "@/components/SectionNews";

async function getNewsBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEWS_API}/api/News/list?slug=${slug}&lang=pt-br`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug, editoria } = await params;

  const data = await getNewsBySlug(slug);
  const canonical = `/${editoria}/${slug}`;

  return {
    title: data?.seo?.title || data?.title || "",
    description: data?.seo?.description || data?.description || "",
    alternates: { canonical },

    // pode ser string direto
    keywords: data?.seo?.keywords || "",

    openGraph: {
      title: data?.seo?.title || data?.title || "",
      description: data?.seo?.description || data?.description || "",
      url: canonical,
      images: data?.imageUrl ? [{ url: data.imageUrl }] : [],
    },
  };
}

export default async function Slug({ params }) {
  const { slug,editoria } = await params;

  const data = await getNewsBySlug(slug);

  return <SectionNews id={data?.id} slug={slug}  />;
}
