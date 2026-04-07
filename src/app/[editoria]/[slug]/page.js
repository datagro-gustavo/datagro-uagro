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
  const { slug,editoria } = await params;


  const data = await getNewsBySlug(slug);
  console.log(data?.yoast)
  const canonical = `https://www.uagro.com.br/${editoria}/${slug}`;

  return {
    title: data?.yoast?.title,
    description: data?.yoast?.description,
    alternates: { canonical },
    keywords:data?.yoast?.focusKeyword,
    openGraph: {
      title: data?.title,
      description: data?.description,
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
