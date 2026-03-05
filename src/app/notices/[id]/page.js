
/* COMPONENTS */

import styled from "styled-components"
import SectionNotice from "@/components/SectionMatters"


export default async function Notices({ params }) {
    const {assunto} = await params;

    return (    
        <SectionNotice page="assunto" slug={assunto}  />
    )
}