import SectionCultura from "@/components/SectionCultura/page";

async function getNewsById() {
    const res = await fetch(
        `https://api.uagro.com.br/api/News/list?marketId=5&lang=pt-br&quantity=1`,
        { cache: "no-store" }
    );

    return res.json();
}

export async function generateMetadata() {
    const data = await getNewsById();

    return {
        title: data[0]?.title,
        description: data[0]?.description,
        openGraph: {
            title: data[0]?.title,
            description: data[0]?.description,
            images: data[0]?.imageUrl ? [data[0].imageUrl] : [],
        },
        alternates: {
            canonical: "https://www.uagro.com.br",
        },
    };
}

export default async function Cultura({ params }) {
    return (
        <SectionCultura id={5} link={"asdsad"} />
    );
}