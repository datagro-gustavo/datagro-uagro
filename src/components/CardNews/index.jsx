'use client'

import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NewsContext } from "../../context/news";
import { Lock } from "lucide-react";
import CardMiniChart from "./utils/miniChart";
import { ColumnContext } from "../../context/column";
import Image from "next/image";
import { SafeImage } from "../SafeImage";

// Utilitário interno: traduz prioridade em classes visuais
const priorityClasses = {
	high: " border-neutral-900",
	medium: " border-neutral-400",
	low: "",
};


const aspectClass = (ratio) => {
	if (!ratio) return "aspect-[16/9]";
	const safe = ratio.replace(":", "/");
	return `aspect-[${safe}]`;
};


// const SafeImage = ({ src, alt, className }) => {
//   const [currentSrc, setCurrentSrc] = useState(null);
//   const [extensionIndex, setExtensionIndex] = useState(0);
//   const [error, setError] = useState(false);

//   const extensions = ["jpg", "jpeg", "png"];

//   const transformUrl = (url) => {
//     if (!url) return null;

//     // ✅ remove "undefined" e "NaN" se vierem na string
//     const cleaned = String(url)
//       .trim()
//       .replace(/undefined/gi, "")
//       .replace(/nan/gi, "")
// 	  .replace(/NaN/gi, "");

//     if (!cleaned) return null;

//     const S3 = "https://s3-uagro.s3.amazonaws.com";
//     const u = cleaned;

//     const needle = "//noticias_img/";
//     const idx = u.indexOf(needle);
//     if (idx !== -1) {
//       const tail = u.slice(idx + 2);
//       return `${S3}/${tail.replace(/^\/+/, "")}`;
//     }

//     let pathname = u;
//     try {
//       pathname = new URL(u).pathname;
//     } catch {}

//     const wp = pathname.indexOf("/wp-content/");
//     if (wp !== -1) {
//       const after = pathname.slice(wp + "/wp-content/".length);
//       return `${S3}/${after.replace(/^\/+/, "")}`;
//     }

//     if (pathname.startsWith("/")) return `${S3}${pathname}`;
//     return `${S3}/${pathname}`;
//   };

//   useEffect(() => {
//     if (!src) return;

//     const baseUrl = transformUrl(src);
//     if (!baseUrl) return;

//     const noExtension = baseUrl.replace(/\.(jpg|jpeg|png)$/i, "");

//     setExtensionIndex(0);
//     setCurrentSrc(`${noExtension}.${extensions[0]}`);
//     setError(false);
//   }, [src]);

//   const handleError = () => {
//     const baseWithoutExt = currentSrc.replace(/\.(jpg|jpeg|png)$/i, "");

//     if (extensionIndex < extensions.length - 1) {
//       const nextIndex = extensionIndex + 1;
//       setExtensionIndex(nextIndex);
//       setCurrentSrc(`${baseWithoutExt}.${extensions[nextIndex]}`);
//     } else {
//       setError(true);
//     }
//   };

//   if (!currentSrc || error) {
//     return (
//       <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
//         <div className="w-8 h-8 bg-neutral-300 rounded-sm" />
//       </div>
//     );
//   }

//   return (
//     <Image
//       src={currentSrc}
//       alt={alt}
//       width={500}
//       height={500}
//       className={className}
//       loading="lazy"
//       onError={handleError}
//     />
//   );
// };

const CardNews = ({
	priority = "low",
	width = "w-full",
	imageUrl,
	category,
	categoryId,
	categoryName,
	title,
	id,
	styles,
	description,
	items = [],
	slug,
	type = "default",
	listdescription,
	listItems = [],
	layout,
	dateLabel,
	noticeId,
	href = "#",
	imageAspectRatio = "16/9",
	columnistId,
	article,
	video,
	chart,
	lock,
}) => {
	const { linkColor, setMarketId } = useContext(NewsContext)
	const { setColumnistName } = useContext(ColumnContext)

	const router = useRouter()

	const mediaType = video ? "v" : chart ? "c" : null;

	const [links] = useState([
		{
			name: "Algodão",
			color: "#90C1DF",
			hoverColor: "#68a0c3",
			link: "/algodao"
		},
		{
			name: "Açúcar e Etanol",
			color: "#35CA35",
			hoverColor: "#27b227",
			link: "/acucar-e-etanol"

		},
		{
			name: "Biodiesel",
			color: "#9AD379",
			hoverColor: "#84c060",
			link: "/biodisel"

		},
		{
			name: "Borracha",
			color: "#316380",
			hoverColor: "#285873",
			link: "/borracha"

		},
		{
			name: "Café",
			color: "#9B650C",
			hoverColor: "#8c5b0c",
			link: "/cafe"

		},
		{
			name: "Citrus",
			color: "#F8C29A",
			hoverColor: "#f3a264",
			link: "/citrus"
		},
		{
			name: "Fertilizantes e Proteção de Cultivos",
			color: "#316380",
			hoverColor: "#214961",
			link: "/fertilizantes"
		},
		{
			name: "Milho",
			color: "#EBB52E",
			hoverColor: "#d8a627",
			link: "/milho"
		},
		{
			name: "Pecuária",
			color: "#EB7569",
			hoverColor: "#ee5948",
			link: "/pecuaria"
		},
		{
			name: "Petróleo e Derivados",
			color: "#6E9381",
			hoverColor: "#618071",
			link: "/petroleo"
		},
		{
			name: "Soja",
			color: "#9183B6",
			hoverColor: "#7d63c0",
			link: "/soja"
		},
		{
			name: "Trigo",
			color: "#B7AC7B",
			hoverColor: "#b2a04f",
			link: "/trigo"
		}
	])

	const path = window.location.pathname;
	const parts = path.split("/");
	const name = parts[2];

	const match = links.find(item => item.link.slice(1) === name);

	const hover = match?.hoverColor;

	const renderMedia = () => {
		const wrapperClass = ["w-full", aspectClass(imageAspectRatio)].join(" ");

		if (mediaType === "v") {
			return (
				<div className={wrapperClass}>
					<iframe
						src={video?.url || video}
						title={title}
						className="w-full h-full"
						frameBorder="0"
						allowFullScreen
					/>
				</div>
			);
		}

		if (mediaType === "c") {
			return (
				<CardMiniChart
					chartConfig={chart}
					wrapperClass={wrapperClass}
				/>
			);
		}

		// fallback imagem / skeleton
		if (imageUrl) {
			return (
				<div className={wrapperClass}>
					<SafeImage
						src={imageUrl}
						alt={title || ""}
						className="block w-full h-full object-cover group-hover:opacity-90 transition"
					/>
				</div>
			);
		}

		return (
			<div className={wrapperClass}>
				<Skeleton className="w-full h-full object-cover" />
			</div>
		);
	};

	const slugify = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // espaços -> hífen
    .replace(/[^\w-]+/g, "") // remove caracteres especiais
    .replace(/--+/g, "-") // evita múltiplos hífens
    .trim();
};

	const onClick = (slug) => {
	
		router.push(`/${slugify(category[0]?.title)}/${slug}`)
	}

	const onClickGoToCategory = (category, categoryId) => {

		router.push(`/${slugify(category.toLowerCase())}`)
	};

	// const navigate = useNavigate()

	if (type === "mini-stack" && items?.length > 0) {
		return (
			<section className={`${width} flex flex-col gap-4`}>

				{items.map((it) => (
					<span
						key={it.id}
						className=" grid grid-cols-[120px,minmax(0,1fr)] gap-3 items-start cursor-pointer"
					>

						<div className="flex items-center gap-4">
							{/* thumb 120x90 (4:3) */}
							<div className="w-[120px] h-[90px] overflow-hidden  flex-shrink-0">
								<SafeImage
									src={String(it.imageUrl)}
									alt={it.title || ""}
									className="block w-full h-full object-cover :opacity-90 transition"
								/>
							</div>



							{/* texto: permite encolher e quebra correta */}
							<div className="min-w-0">

								<span onClick={() => onClickGoToCategory(it?.category, it?.categoryId)} className={`cursor-pointer text-[#98bf0e] inline-flex items-center px-0 py-1 text-xs font-semibold uppercase hover:underline `}>
									{it?.category}
								</span>

								<h4
									onClick={() => onClick(it.slug)}

									className="text-[15px] leading-snug font-semibold text-neutral-900
                         						group-hover:underline line-clamp-3 break-words"
									description={it.title}
								>
									{it.title}
								</h4>
							</div>
						</div>
					</span>
				))}
			</section>
		);
	}

	if (type === "ranked-list" && listItems?.length > 0) {
		return (
			<aside className={`${width}`}>
				{listdescription && (
					<h2 className={`text-sm font-bold uppercase ${styles?.textColor} mb-1`}>
						{listdescription}
					</h2>
				)}
				<ul className="space-y-5">
					{listItems.map((item) => (
						<li key={item.id} className="flex flex-col">
							<div className="flex items-baseline space-x-2">
								<span className={`${styles?.textColor}  font-bold text-[#319e96] text-lg leading-none`}>
									{item.number}
								</span>
								<span className=" cursor-pointer hover:underline text-[11px] uppercase text-[#629100] font-semibold tracking-wide" onClick={() => onClickGoToCategory(item)}>
									{/* {lock === 3 ? (
										<>
											<Lock className="ml-1 h-4" />
										</>
									) : (
										<></>
									)} */}
								</span>
							</div>
							<span
								className="text-[15px] leading-snug font-semibold text-neutral-900 hover:underline cursor-pointer"
								onClick={() => onClick(item.slug)}

							>
								{item.title}
							</span>
						</li>
					))}
				</ul>
			</aside>
		);
	}

	if (layout === "horizontal") {
		return (
			<article key={id} className={`${width} font-lora`}>
				<div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start`}>
					<span onClick={() => onClick(slug)} className="block lg:col-span-5 cursor-pointer"
					>
						<div className="relative w-full aspect-[16/9] lg:aspect-auto lg:h-[220px] overflow-hidden">

							{!imageUrl

								?
								<Skeleton className="w-full h-full object-cover" />
								:
								<SafeImage
									src={String(imageUrl).replace(/%22$/, "")}
									alt={title || ""}
									className="block w-full h-full object-cover group-hover:opacity-90 transition"
								/>
							}

						</div>
					</span>

					<div className="lg:col-span-7 flex flex-col justify-start">
						{Array.isArray(category) && category.length > 0 && (
							<div className="flex flex-wrap gap-2 mt-3 mb-2">
								{category.map((cat) => (
									<span
										key={cat.id}
										onClick={() => onClickGoToCategory(cat.title, cat.id)}
										className="cursor-pointer text-[#98bf0e] text-xs font-semibold uppercase hover:underline"
									>
										{cat.title}
									</span>
								))}
							</div>
						)}

						{title && (
							<p className="text-[1.3rem] font-extrabold leading-snug text-neutral-900">
								<span className="hover:underline decoration-2 underline-offset-2 cursor-pointer"
									onClick={() => onClick(slug)}>
									{title}
								</span>
							</p>
						)}
						{description && (
							<p className="mt-2 text-[0.95rem] leading-relaxed text-neutral-700 line-clamp-4">
								{description}
							</p>
						)}
					</div>
				</div>
			</article>
		);
	}

	if (layout === "horizontal-culture") {
		return (
			<article key={id} className={width}>
				<div className="grid grid-cols-1 lg:grid-cols-10 gap-6  ">
					<span
						onClick={() => onClick(slug)}
						className="block lg:col-span-5 cursor-pointer"
					>

						<div className="  w-full aspect-[16/10] md:aspect-[16/14]">
							{!imageUrl ? (
								<Skeleton className="w-full h-full object-cover" />
							) : (

								<SafeImage
									src={String(imageUrl).replace(/%22$/, "")}
									alt={title || ""}
									className="block w-full h-full object-cover group-hover:opacity-90 transition"
								/>
							)}
						</div>
					</span>

					{/* Texto + links à direita */}
					<div className="lg:col-span-5 flex flex-col justify-center  ">

						{category ? (
							<></>
						) : (
							<>
								<Skeleton className=" h-full object-cover" />
								<Skeleton className=" h-full object-cover" />
								<Skeleton className=" h-full object-cover" />

							</>

						)}

						{/* Título principal */}
						{title && (
							<h3>
								<span
									className="hover:underline decoration-2 underline-offset-2  cursor-pointer"
									onClick={() => onClick(slug)}
								>
									{title}

								</span>
							</h3>
						)}

						{/* Descrição */}
						{description && (
							<p className="mt-2 text-[0.95rem] leading-relaxed text-neutral-700 line-clamp-4">
								{description}
							</p>
						)}

						{/* Lista */}
						{listItems && listItems.length > 0 && (
							<ul className="mt-4 space-y-2">
								{listItems.map((item) => (
									<li key={item.id}>
										<button
											type="button"
											className="cursor-pointer text-left group"
											onClick={() => onClick(item.slug)}
										>
											<div className={`border border-[${linkColor?.hoverColor}] w-[10%]`} />
											<span className="text-sm md:text-base font-semibold text-neutral-900 group-hover:underline">
												{item.title}
											</span>
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

			</article>
		);
	}
	// ==============================================================
	// VARIAÇÃO 2 — Card comum (imagem + texto)
	// ==============================================================
	return (
		<article
			className={[
				"font-folar overflow-hidden duration-200 ",
				priorityClasses[priority] || priorityClasses.low,
				width
			].join(" ")}
		>
			{/* Imagem no topo com aspecto consistente */}
			<span
				onClick={() => onClick(slug)}
				className="block cursor-pointer"
			>
				{renderMedia()}
			</span>

			{/* Corpo do card */}
			<div className="" >
				{Array.isArray(category) && category.length > 0 && (
					<div className="flex flex-wrap items-center gap-1 mt-3 mb-2">
						{category.map((cat, index) => (
							<React.Fragment key={cat.id}>
								<span
									onClick={() => onClickGoToCategory(cat.title, cat.id)}
									className="cursor-pointer text-[#98bf0e] text-xs h-[0.8rem] font-semibold uppercase hover:underline"
								>
									{cat.title}
								</span>

								{/* separador */}
								{index < category.length - 1 && (
									<span className="text-neutral-400 mx-1">/</span>
								)}
							</React.Fragment>
						))}
					</div>
				)}



				{/* Manchete */}
				{title && priority === 'high' ? (
					<h1 className={`text-2xl ${styles?.titleFontWeight} ${styles?.titleFontSize} leading-snug text-neutral-900`}>
						<span
							className="hover:underline decoration-2 underline-offset-2 cursor-pointer"
							onClick={() => onClick(slug)}
						>
							{!category ? <div className="mt-4"></div> : <></>}

							{title}
						</span>
					</h1>
				) : (
					<h3 className={`text-[17px] ${styles?.titleFontWeight} ${styles?.titleFontSize} leading-snug text-neutral-900`}>
						<span
							className="hover:underline decoration-2 underline-offset-2 "
							onClick={() => onClickGoToCategory(categoryName, categoryId)}
						>
							{!category ? <div style={{ marginTop: categoryName ? '0.8rem' : '0rem' }} className="">
								<span className={`${categoryName ? ' cursor-pointer' : ''}  text-[#98bf0e] inline-flex items-center px-0 py-1 text-xs font-semibold uppercase hover:underline `}>

									{categoryName}
								</span>


							</div> : <></>}
						</span>

						<span onClick={() => onClick(slug)} className="cursor-pointer hover:underline">
							{!title ? <div style={{ height: "1.1rem" }}> <Skeleton width={"80%"} height={"15px"} /></div> : <></>}

							{!title ? <Skeleton width={"70%"} height={"15px"} /> : title}
						</span>
					</h3>
				)}

				{/* Resumo curto (opcional) */}
				{description && (
					<p className="mt-2 text-sm md:text-lg text-neutral-700 line-clamp-3">
						{description}
					</p>
				)}

				{/* Meta (data/etiqueta) */}

				{dateLabel && (
					<div className="mt-3 text-xs text-neutral-500">{dateLabel}</div>
				)}
			</div>
		</article>
	);
};

export default CardNews;
