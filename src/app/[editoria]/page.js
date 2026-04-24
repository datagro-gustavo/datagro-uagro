import { redirect } from "next/navigation";
import SectionNoticesMatters from "@/components/SectionMatters";

const slugify = (text) => {
  return text
    ?.toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default async function Editoria({ params }) {
  const { editoria } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEWS_API}/api/matters/list?lang=pt-br`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    redirect("/");
  }

  const matters = await res.json();

  const currentSlug = slugify(editoria);

  const foundMatter = matters.find(
    (item) => slugify(item?.Name) === currentSlug
  );

  if (!foundMatter) {
    redirect("/");
  }

  return (
    <SectionNoticesMatters
      page="assunto"
      id={currentSlug}
      slug={currentSlug}
      matter={foundMatter}
    />
  );
}