
/* COMPONENTS */

import SectionNoticesMatters from "@/components/SectionMatters";
import SectionNoticesTags from "@/components/SectionTags";


export default async function Editoria({ params }) {
    const {id, slug} = await params;

    return (    
        <SectionNoticesMatters page="assunto" id={id}  slug={slug}  />
    )
}