
/* COMPONENTES */
import { SectionArtigo } from "@/components/SectionArtigo"

async function getNewsById(id) {

    const res = await fetch(
        `https://api.datagro.com/api/News/list?newsId=${id}&lang=pt-br`,
        { cache: "no-store" }
    );

    return res.json();
}

export async function generateMetadata({ params }) {
    const { id } = await params;

    const data = await getNewsById(id);

    return {
        title: data?.title,
        description: data?.description,
        openGraph: {
            title: data?.title,
            description: data?.description,
            images: data?.imageUrl ? [data.imageUrl] : [],
        },
        alternates: {
            canonical: "https://www.uagro.com.br",
        },
    };
}

export default async function Artigo({ params }) {
    const { id, columid } = await params
    await getNewsById(id);
    return (
        <SectionArtigo id={id} columnistId={columid} />
    )
}