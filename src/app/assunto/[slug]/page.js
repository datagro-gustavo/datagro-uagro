
/* COMPONENTS */

import SectionNoticesTags from "@/components/SectionTags";


export default async function Assunto({ params }) {
    const {slug} = await params;


    return (    
        <SectionNoticesTags page="assunto" slug={slug}  />
    )
}