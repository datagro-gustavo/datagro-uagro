/* COMPONENTS */

import SectionNoticesMatters from "@/components/SectionMatters";
import SectionNoticesTags from "@/components/SectionTags";

export default async function Editoria({ params }) {
    const {editoria} = await params;

    return (
        <SectionNoticesMatters page="assunto" id={editoria} slug={editoria} />
    )
}