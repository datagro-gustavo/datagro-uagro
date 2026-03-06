// src/config/config.jsx
// Estrutura do layout “Mais Lidas” igual à imagem:
// Coluna 1 → lista numerada
// Colunas 2 e 3 → destaque grande
// Abaixo → grid de cards pequenos 2x3

/* IMAGES */

import starIcon from '../assets/outher_images/SVG.png'
import thumb from '../assets/thumb.png'

export const sessionsConfig = [
  // =====================================================
  // Sessão HERO (mantida)
  // =====================================================
  {
    id: "s-hero",
    name: "hero",
    title: "Sessão Hero",
    columns: false,
    flex: "grid grid-cols-1 lg:grid-cols-5 gap-4",
    width: "w-full",
    qtd_cards: [
      {
        id: "hero-lead",
        priority: "high",
        width: "lg:col-span-2 lg:row-span-2",
        imageAspectRatio: "16/9",
        showDescription: true,
        imageUrl: "",
        category: "",
        title: "",
        description: "",
        dateLabel: "",
        href: "#",
        icon: starIcon,
        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-[#98BF0E] hover:underline cursor-pointer',
          fontSize: "",
          titleFontSize: "text-[30px]",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-bold",

        }
      },
      {
        id: "hero-side-1",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "", category: "",
        title: "",
        href: "#",
        icon: starIcon,

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-[#98BF0E] hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",

        href: "#",
        icon: starIcon,

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-[#98BF0E] hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: starIcon,

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-[#98BF0E] hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-4",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",

        href: "#",
        icon: starIcon,

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          bottomTextPrimary: "mb-0.5",
          textColor: 'text-[#98BF0E] hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          titleFontWeight: "font-medium",
          descriptionFontWeight: ""
        }
      },
      {
        id: "hero-side-4",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",

        href: "#",
        icon: starIcon,

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          bottomTextPrimary: "mb-0.5",
          textColor: 'text-[#98BF0E] hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          titleFontWeight: "font-medium",
          descriptionFontWeight: ""
        }
      },
      {
        id: "hero-side-4",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",

        href: "#",
        icon: starIcon,

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          bottomTextPrimary: "mb-0.5",
          textColor: 'text-[#98BF0E] hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          titleFontWeight: "font-medium",
          descriptionFontWeight: ""
        }
      },
    ],
  },
  {
    id: "s-mais-lidas",
    name: "mais-lidas",
    title: "Mais Lidas",
    columns: true,

    flex: "grid grid-cols-1 lg:grid-cols-11 gap-x-5 items-start",
    width: "w-full",

    qtd_cards: [
      // ===== Coluna 1 — Lista numerada =====
      {
        id: "ml-left-ranked",
        type: "ranked-list",
        width: "lg:col-span-3  lg:col-start-1 lg:row-span-2",
        listTitle: "MAIS LIDAS",
        styles: {
          textColor: "text-secondary hover:underline cursor-pointer "
        },
        listItems: [
          {
            id: "ml-r1",
            number: 1,
            category: "NEGÓCIOS",
            styles: {
              textColor: "text-secondary hover:underline cursor-pointer"
            },
            title: "",
            href: "#",
          },
          {
            id: "ml-r2",
            number: 2,
            category: "",
            styles: {
              textColor: "text-secondary hover:underline cursor-pointer"
            },
            title: "",
            href: "#",
          },
          {
            id: "ml-r6",
            number: 2,
            category: "",
            styles: {
              textColor: "text-secondary hover:underline cursor-pointer"
            },
            title: "",
            href: "#",
          },
          {
            id: "ml-r3",
            number: 3,
            category: "NEGÓCIOS",
            styles: {
              textColor: "text-secondary hover:underline cursor-pointer"
            },
            title: "",
            href: "#",
          },
          {
            id: "ml-r4",
            number: 4,
            category: "",
            styles: {
              textColor: "text-secondary hover:underline cursor-pointer"
            },
            title: "",
            href: "#",
          },
          {
            id: "ml-r5",
            number: 5,
            category: "",
            styles: {
              textColor: "text-secondary hover:underline cursor-pointer"
            },
            title: "",
            href: "#",
          },
        ],
      },

      // ===== Destaque principal (imagem + texto ao lado) =====
      {
        id: "ml-main-highlight",
        type: "main-highlight",
        width: "lg:col-span-9 lg:col-start-4 ml-0 mb-5",
        priority: "high",
        imageAspectRatio: "16/9",
        layout: "horizontal",
        imageUrl:
          "",
        category: "",
        title: "",
        description: "",
        styles: {
          textColor: "text-secondary cursor-pointer hover:underline"
        },
        href: "#",
      },

      // ===== Mini-stack esquerda (3 cards abaixo da imagem) =====
      {
        id: "ml-col2-stack",
        type: "mini-stack",
        width: "lg:col-span-4 lg:col-start-4 lg:row-start-2 lg:pl-0",
        items: [
          {
            id: "ml-c2-1",
            imageUrl:
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop%22",
            title: "",
            href: "#",
          },
          {
            id: "ml-c2-2",
            imageUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop%22",

            title: "",
            href: "#",
          },
          {
            id: "ml-c2-3",
            imageUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop%22",
            title: "",
            href: "#",
          },
        ],
      },

      // ===== Mini-stack direita (3 cards abaixo do destaque, col 8–12) =====
      {
        id: "ml-col3-stack",
        type: "mini-stack",
        width: "lg:col-span-4 lg:col-start-8.9 lg:row-start-2 lg:pl-0",
        items: [
          {
            id: "ml-c3-1",
            imageUrl:
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop%22",
            title: "",
            href: "#",
          },
          {
            id: "ml-c3-2",
            imageUrl:
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop%22",
            title: "",
            href: "#",
          },
          {
            id: "ml-c3-3",
            imageUrl:
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop%22",
            title: "",
            href: "#",
          },
        ],
      },
    ],
  },
  {
    id: "s-mais-lidas-not-found",
    name: "s-mais-lidas-not-found",
    title: "Mais Lidas",
    columns: true,

    flex: "grid grid-cols-1 lg:grid-cols-1 gap-x-1 items-start",
    width: "w-full",

    qtd_cards: [
      // ===== Coluna 1 — Lista numerada =====
      {
        id: "ml-left-ranked",
        type: "ranked-list",
        width: "lg:col-span-3  lg:col-start-1 lg:row-span-2",
        listTitle: "MAIS LIDAS",
        styles: {
          textColor: "text-secondary "
        },
        listItems: [
          {
            id: "ml-r1",
            number: 1,
            category: "NEGÓCIOS",
            styles: {
              textColor: "text-secondary "
            },
            title: "",
            href: "#",
          },
          {
            id: "ml-r2",
            number: 2,
            category: "LINHA EXECUTIVA",
            styles: {
              textColor: "text-secondary "
            },
            title: "",
            href: "#",
          },
          {
            id: "ml-r3",
            number: 3,
            category: "NEGÓCIOS",
            styles: {
              textColor: "text-secondary "
            },
            title: "",
            href: "#",
          },
          {
            id: "ml-r4",
            number: 4,
            category: "",
            styles: {
              textColor: "text-secondary "
            },
            title: "",
            href: "#",
          },
          {
            id: "ml-r5",
            number: 5,
            category: "",
            styles: {
              textColor: "text-secondary "
            },
            title: "",
            href: "#",
          },
        ],
      },

      // ===== Destaque principal (imagem + texto ao lado) =====

      // ===== Mini-stack esquerda (3 cards abaixo da imagem) =====

    ],
  },
  {
    id: "culture-section",
    name: "culture-section",
    title: "",
    columns: true,

    flex: "grid grid-cols-1 lg:grid-cols-1 gap-x-1 items-start",
    width: "w-full",

    qtd_cards: [
      {
        id: "culture-main",
        type: "default",
        layout: "horizontal-culture",
        width: "w-full",
        priority: "high",
        styles: {
          textColor: " hover:underline",
        },
        listItems: [
          {
            id: "",
            title: "",
            href: "",
          },
          {
            id: "culture-2",
            title: "",
            href: "/cultura/mostra-cinema-independente",
          },
          {
            id: "culture-3",
            title: "",
            href: "/cultura/festival-gastronomico-brasil",
          },
        ],
      },
    ],
  },

  // ==========================
  // SESSÃO NEGÓCIOS (layout editorial)
  // ==========================
  {

    id: "s-negocios",
    name: "negocios",
    title: "Negócios",
    columns: true,

    // 12 colunas para controle fino (lead + sidebar + grade)
    flex: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
    width: "w-full",

    qtd_cards: [
      // ===== Linha 1 — Destaque principal (Col 1–7)
      {
        id: "biz-main-highlight",
        type: "main-highlight",
        width: "lg:col-span-7 lg:col-start-1",
        priority: "high",
        imageAspectRatio: "16/9",
        imageUrl:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop",
        category: "NEGÓCIOS",
        title: "",
        description: "",
        dateLabel: "Hoje, 09:20",
        href: "#",
      },

      // ===== Linha 1 — Sidebar: pilha de 2 cards médios (Col 8–12)
      {
        id: "biz-sidebar-stack",
        type: "mini-stack",
        width: "lg:col-span-5 lg:col-start-8",
        items: [
          {
            id: "biz-s1",
            imageUrl:
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
            title: "",
            href: "#",
          },
          {
            id: "biz-s2",
            imageUrl:
              "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
            title: "",
            href: "#",
          },
        ],
      },

      // ===== Linha 2 — Grade 4 colunas de cards pequenos (Col 1–12)
      {
        id: "biz-mini-grid",
        type: "mini-grid",
        width: "lg:col-span-12 lg:col-start-1",
        gridClass: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
        gridItems: [
          {
            id: "biz-g1",
            imageUrl: "",
            category: "Mercados",
            title: "",
            href: "#",
          },
          {
            id: "biz-g2",
            imageUrl:
              "https://images.unsplash.com/photo-1590650046871-92c887180603?q=80&w=1200&auto=format&fit=crop",
            category: "Startups",
            title: "",
            href: "#",
          },
          {
            id: "biz-g3",
            imageUrl:
              "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop",
            category: "Energia",
            title: "",
            href: "#",
          },
          {
            id: "biz-g4",
            imageUrl:
              "https://images.unsplash.com/photo-1556767576-cfba2d3fa9f1?q=80&w=1200&auto=format&fit=crop",
            category: "Gestão",
            title: "",
            href: "#",
          },
        ],
      },

    ],
  },
  // =====================================================
  {
    id: "s-hero",
    name: "tech",
    title: "Tech, Startups & Rodadas de Investimento",
    columns: false,
    marketId: 2,
    flex: "grid grid-cols-1 lg:grid-cols-4 gap-5",
    width: "w-full",
    qtd_cards: [
      {
        id: "hero-lead",
        priority: "high",
        width: "lg:col-span-2 lg:row-span-2",
        imageAspectRatio: "16/9",
        showDescription: true,
        imageUrl: "",
        category: "Negócios",
        title: "",
        description: "",
        dateLabel: "",
        href: "#",
        icon: "",
        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          titleFontSize: "text-[30px]",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-bold",

        }
      },
      {
        id: "hero-side-1",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "Linha Executiva",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "Negócios",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },



    ],
  },
  {
    id: "s-hero",
    name: "techcolumns",
    title: "Tech, Startups & Rodadas de Investimento",
    columns: false,
    marketId: 2,
    flex: "grid grid-cols-1 lg:grid-cols-4 gap-5",
    width: "w-full",
    qtd_cards: [
      {
        id: "hero-lead",
        priority: "high",
        width: "lg:col-span-2 lg:row-span-2",
        imageAspectRatio: "16/9",
        showDescription: true,
        imageUrl: "",
        category: "Negócios",
        title: "",
        description: "",
        dateLabel: "",
        href: "#",
        icon: "",
        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          titleFontSize: "text-[30px]",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-bold",

        }
      },
      {
        id: "hero-side-1",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "Linha Executiva",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "Negócios",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },



    ],
  },
  {
    id: "s-hero",
    name: "rowsection",
    title: "",
    columns: false,
    flex: "grid grid-cols-1 lg:grid-cols-4 gap-4",
    width: "w-full",
    qtd_cards: [

      {
        id: "hero-side-1",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-4",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-5",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      }, {
        id: "hero-side-6",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },

      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },


    ],
  },
  {
    id: "s-hero",
    name: "rowsectioncategory",
    marketId: 14,
    title: "",
    columns: false,
    flex: "grid grid-cols-1 lg:grid-cols-4 gap-4",
    width: "w-full",
    qtd_cards: [

      {
        id: "hero-side-1",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },


    ],
  },
  {
    id: "s-hero",
    name: "leiaTambem",
    title: "Leia Também",
    columns: false,
    flex: "grid grid-cols-1 lg:grid-cols-4 gap-4",
    width: "w-full",
    qtd_cards: [

      {
        id: "hero-side-1",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title: "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },


    ],
  },
  {
    id: "s-hero",
    name: "financial",
    title: "Finanças Pessoais",
    columns: false,
    flex: "grid  lg:grid-cols-6 gap-4",
    width: "w-full",
    qtd_cards: [


      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },




    ],
  },
  {
    id: "datagro-cop",
    name: "datagro-cop",
    title: "Só na DATAGRO",
    columns: true,


    flex: "grid grid-cols-1 lg:grid-cols-9 gap-x-3 items-start",
    width: "w-full",

    qtd_cards: [
      // ===== Coluna 1 — Lista numerada =====

      // ===== Destaque principal (imagem + texto ao lado) =====
      {
        id: "ml-main-highlight",
        type: "main-highlight",
        width: "lg:col-span-9 lg:col-start-1",
        priority: "high",
        imageAspectRatio: "16/9",
        layout: "horizontal",
        imageUrl: thumb,
        category: "",

        headline:
          "",
        summary:
          "",
        href: "#",
      },

      // ===== Mini-stack esquerda (3 cards abaixo da imagem) =====
      {
        id: "ml-col2-stack",
        type: "mini-stack",
        width: "lg:col-span-4 lg:col-start-1 lg:row-start-2 lg: py-5",
        items: [
          {
            id: "ml-c2-1",
            imageUrl:
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop%22",
            headline:
              "",
            href: "#",
          },
          {
            id: "ml-c2-2",
            imageUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop%22",
            headline:
              "",
            href: "#",
          },

        ],
      },

      // ===== Mini-stack direita (3 cards abaixo do destaque, col 8–12) =====
      {
        id: "ml-col3-stack",
        type: "mini-stack",
        width: "lg:col-span-4 lg:col-start-5 lg:row-start-2 lg: py-5",
        items: [
          {
            id: "ml-c3-1",
            imageUrl:
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop%22",
            headline:
              "",
            href: "#",
          },
          {
            id: "ml-c3-2",
            imageUrl:
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop%22",
            headline:
              "",
            href: "#",
          },

        ],
      },
    ],
  },
  {
    id: "s-hero",
    name: "rowsnoticesection",
    title: "Mais Notícias",
    columns: false,
    flex: "grid grid-cols-1 lg:grid-cols-4 gap-4",
    width: "w-full",
    qtd_cards: [

      {
        id: "hero-side-1",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showSummary: false,
        imageUrl: "",
        category: "",
        headline:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          headlineFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-2",
        priority: "low",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showSummary: false,
        imageUrl: "",
        category: "",
        headline:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",

          headlineFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showSummary: false,
        imageUrl: "",
        category: "",
        headline:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },
      {
        id: "hero-side-3",
        priority: "medium",
        width: "lg:col-span-1",
        imageAspectRatio: "16/9",
        showDescription: false,
        imageUrl: "",
        category: "",
        title:
          "",
        href: "#",
        icon: "",

        styles: {
          background: 'bg-blue-500',
          width: "w-[190px]",
          textColor: 'text-secondary hover:underline cursor-pointer',
          fontSize: "",
          marginTopCategory: "mt-2.5",
          bottomTextPrimary: "mb-0.5",
          titleFontWeight: "font-medium",

        }
      },


    ],
  },
];

export const ativos = [
  {
    name: "ticker",
    ativos:
      [
        {
          "ativo": "SB@1:5",
          "nome":
          {
            "pt-br": "A\u00e7\u00facar",
            "en-us": "Sugar"
          }
        },
        {
          "ativo": "SZ@1:4",
          "nome": { "pt-br": "Soja", "en-us": "Soybean" }
        },
        { "ativo": "D_PEPR_SP_BR:2", "nome": { "pt-br": "Boi", "en-us": "Cattle" } },
        { "ativo": "ZC@1:4", "nome": { "pt-br": "Milho", "en-us": "Corn" } },
        { "ativo": "CT@1:5", "nome": { "pt-br": "Algod\u00e3o", "en-us": "Cotton" } }
      ],
  }
]

export const quadros = [
  {
    name: "quadrosHome",
    idb: 127,
    cards: 3,
    ids: [81, 82, 83, 84, 85, 128, 88]
  },
  {
    name: "quadrosIntegra",
    idb: 127,
    cards: 6,
    ids: [81, 82, 83, 84, 85, 128, 88]
  }
]

export const marketsIds = [

  {
    name: "algodao",
    code: 1,
  },
  {
    name: "acucar-e-etanol",
    code: 2
  },
  {
    name: "biodisel",
    code: 14
  },
  {
    name: "borracha",
    code: 17
  },
  {
    name: "cafe",
    code: 3
  },
  {
    name: "citrus",
    code: 7
  },
  {
    name: "fertilizantes",
    code: 16
  },
  {
    name: "milho",
    code: 9
  },
  {
    name: "pecuaria",
    code: 5
  },
  {
    name: "petroleo",
    code: 13
  },
  {
    name: "soja",
    code: 10
  },
  {
    name: "trigo",
    code: 11
  }

]

export const editorias = [

  {
    categoria: "Agroeconomia",
    subcategorias: [
      {
        name: "Todas"
      },
      {
        name: "DATAGRO Governos"
      },
      {
        name: "Conteúdo Gratuito"
      },
      {
        name: "Agenda do Agro"
      },
      {
        name: "Algodão",
        slug: "algodao",
        code: 1,
      },
      {
        name: "Açucar e Etanol",
        slug: "acucar-e-etanol",
        code: 2
      },
      {
        name: "Biodiesel",
        slug: "biodisel",
        code: 14
      },
      {
        name: "Borracha",
        slug: "borracha",
        code: 17
      },
      {
        name: "Café",
        slug: "cafe",
        code: 3
      },
      {
        name: "Citrus",
        slug: "citrus",
        code: 7
      },
      {
        name: "Fertilizantes e Proteção de Cultivos",
        slug: "fertilizantes",
        code: 16
      },
      {
        name: "Milho",
        slug: "milho",
        code: 9
      },
      {
        name: "Pecuária",
        slug: "pecuaria",
        code: 5
      },
      {
        name: "Petróleo e Derivados",
        slug: "petroleo",
        code: 13
      },
      {
        name: "Soja",
        slug: "soja",
        code: 10
      },
      {
        name: "Trigo",
        slug: "trigo",
        code: 11
      }
    ],
    navBar: 1,
    link: ""
  },
  {
    categoria: "Política",
    subcategorias: [
      {
        name: "Todas"
      },
      {
        name: "Algodão",
        slug: "algodao",
        code: 1,
      },
      {
        name: "Açucar e Etanol",
        slug: "acucar-e-etanol",
        code: 2
      },
      {
        name: "Biodiesel",
        slug: "biodisel",
        code: 14
      },
      {
        name: "Borracha",
        slug: "borracha",
        code: 17
      },
      {
        name: "Café",
        slug: "cafe",
        code: 3
      },
      {
        name: "Citrus",
        slug: "citrus",
        code: 7
      },
      {
        name: "Fertilizantes e Proteção de Cultivos",
        slug: "fertilizantes",
        code: 16
      },
      {
        name: "Milho",
        slug: "milho",
        code: 9
      },
      {
        name: "Pecuária",
        slug: "pecuaria",
        code: 5
      },
      {
        name: "Petróleo e Derivados",
        slug: "petroleo",
        code: 13
      },
      {
        name: "Soja",
        slug: "soja",
        code: 10
      },
      {
        name: "Trigo",
        slug: "trigo",
        code: 11
      }
    ],
    navBar: 1,
    link: "/quotes"

  },
  {
    categoria: "Ciência e tecnologia",
    subcategorias: [

      {
        name: "Produção & Safras",
      },
      {
        name: "Exportações & Importações",
      },
      {
        name: "Estoques & Demanda"
      },
      {
        name: "Relatórios DATAGRO"
      },
      {
        name: "Relatórios Conab"
      },
      {
        name: "Relatórios USDA",
      }

    ],
    navBar: 1,
    link: ""

  },
  {
    categoria: "Agrodigital",
    subcategorias: [

      {
        name: "Geopolítica",
      },
      {
        name: "Política comercial"
      },
      {
        name: "Eleições"
      },
      {
        name: "Regulatório"
      }

    ],
    navBar: 1,
    link: ""

  },
  {
    categoria: "AgroTech",
    subcategorias: [
      "Soja",
      "Milho",
      "Trigo",
      "Arroz",
      "Cana-de-açúcar",
      "Café",
      "Algodão",
      "Hortifrúti",
      "Outros cultivos",
    ],
    navBar: 0

  },
  {
    categoria: "Opinião",
    subcategorias: [
      "Bovinos",
      "Aves",
      "Suínos",
      "Leite",
      "Ovos",
      "Caprinos",
      "Piscicultura",
      "Outros",
    ],
    navBar: 0

  },
  {
    categoria: "Sustentabilidade",
    subcategorias: [

      {
        name: "Previsões"
      },
      {
        name: "Impactos nas lavouras"
      },
      {
        name: "Monitoramento de seca (Drought Monitor)"
      }

    ],
    navBar: 1,
    link: ""

  },
  {
    categoria: "Energia",
    subcategorias: [
      "Biodiesel",
      "Elétrica",
      "Etanol",
      "Petróleo e derivados",
      "Biogás",
      "Energia solar no campo",
      "Outros",
    ],
    navBar: 0

  },
  {
    categoria: "Infraestrutura & Logística",
    subcategorias: [
      "Hidroviário",
      "Rodoviário",
      "Ferroviário",
      "Outros",
    ],
    navBar: 0

  },
  {
    categoria: "Sustentabilidade & Meio Ambiente",
    subcategorias: [
      "Ambiental",
      "Turismo rural",
      "ASG",
      "Veículos elétricos",
      "Créditos de carbono",
      "Florestas plantadas",
    ],
    navBar: 0

  },
  {
    categoria: "Agrometeorologia",
    subcategorias: [
      {
        name: "Tecnologia para o campo"
      },
      {
        name: "Inovação no campo"
      }

    ],
    navBar: 1,
    link: ""

  },

  {
    categoria: "Vida no Campo",
    subcategorias: [
      "Agricultura familiar",
      "Sucessão familiar",
      "Mulheres no agro",
    ],
    navBar: 0

  },
  {
    categoria: "Política setorial",
    subcategorias: [
      "Crédito rural",
      "Direito agrário",
      "Seguro rural",
      "Leis e decretos recentes",
      "Outros",
    ],
    navBar: 0

  },
  {
    categoria: "Opinião",
    subcategorias: [
      "Artigos de especialistas",
      "Editoriais",
    ],
    navBar: 0,
    link: ""

  },
  {
    categoria: "Multimídia",
    subcategorias: [
      "Podcast",
      "Vídeos",
      "Eventos",
    ],
    navBar: 0,
    link: ""

  },

];


export const instituctionalLinks = [
  {
    id: 1,
    name: "Consultoria",
    description: "Agrícola, Industrial, Financeira, Gestão Assistida, Governos e Outros.",
    button: { text: "Consultoria", href: "https://www.datagro.com" }
  },
  {
    id: 2,
    name: "Conteúdo",
    description: "Agrícola, Industrial, Financeira, Gestão Assistida, Governos e Outros.",
    button: { text: "DATAGRO Markets", href: "#" }
  },
  {
    id: 3,
    name: "Eventos",
    description: "Conferências, Eventos, Seminários.",
    button: { text: "DATAGRO Experience", href: "https://www.datagroconferences.com" }
  },
  {
    id: 4,
    name: "Educação",
    description: "Executiva, Capacitação e Regulada.",
    button: { text: "DATAGRO University", href: "#" }
  },
]