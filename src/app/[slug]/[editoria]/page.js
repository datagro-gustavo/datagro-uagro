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

  const data = await getNewsBySlug(editoria);
  const canonical = `https://www.uagro.com.br/${editoria}`;

  return {
    title: data?.title ?? "Universo Agro",
    description: data?.description,
    alternates: { canonical },
    openGraph: {
      title: data?.title,
      description: data?.description,
      url: canonical,
      images: data?.imageUrl ? [{ url: data.imageUrl }] : [],
    },
  };
}

export default async function News({ params }) {
  const { slug,editoria } = await params;

  console.log(await params)


  const data = await getNewsBySlug(editoria);

  return <SectionNews id={data?.id} slug={slug}  />;
}
