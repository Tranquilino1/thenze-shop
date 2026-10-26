const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';

export const ASSETS = {
  logo: `${BASE}images/logo.jpeg`,
  img: (name) => `${BASE}images/${name}`
};

export const STORE_INFO = {
  name: "THENZE.SHOP",
  tagline: "Streetwear, Preloved 10/10 & Ediciones Exclusivas",
  city: "Malabo",
  country: "Guinea Ecuatorial",
  whatsappNumber: "240555836931", // Prefijo Guinea Ecuatorial (+240)
  displayPhone: "+240 555 836 931",
  instagram: "@thenze.shop",
  instagramUrl: "https://www.instagram.com/thenze.shop/",
  currency: "CFA",
  deliveryCities: [
    "Malabo (Entrega Rápida)",
    "Bata (Envío Nacional)",
    "Mongomo",
    "Ebebiyín",
    "Luba / Riaba",
    "Otras Zonas de G.E."
  ]
};

export const CATEGORIES = [
  { id: "all", name: "Todos los Productos" },
  { id: "anime", name: "Camisetas Anime & Fútbol" },
  { id: "polos-camisas", name: "Polos & Camisas" },
  { id: "chalecos", name: "Chalecos" },
  { id: "streetwear", name: "Streetwear & Cine" },
  { id: "gorras", name: "Gorras & Accesorios" },
  { id: "preloved", name: "Selección Preloved 10/10" }
];

export const PRODUCTS = [
  {
    id: "goku-dragonball-jersey",
    title: "Camiseta Japón 🇯🇵 x Dragon Ball Goku",
    category: "anime",
    categoryLabel: "Camisetas Anime & Fútbol",
    price: 20000,
    priceFormatted: "20.000 CFA",
    size: "XL",
    condition: "PRELOVED 10/10",
    badge: "Edición Limitada",
    featured: true,
    inStock: true,
    brand: "Adidas / JFA Collab",
    images: [
      `${BASE}images/goku-jersey-front.jpeg`,
      `${BASE}images/goku-jersey-back.jpeg`,
      `${BASE}images/goku-jersey-back-alt.jpeg`
    ],
    description: "Espectacular camiseta crossover de la Selección Nacional de Japón con Dragon Ball Super. Presenta a Son Goku en modo Ultra Instinto con fondo integral de viñetas originales del manga de Akira Toriyama. Incluye escudo bordado de la JFA Japón, detalles en cuello y manga.",
    highlights: [
      "Estado impecable calificado 10/10",
      "Ilustración frontal y dorsal de gran impacto",
      "Escudo JFA y distintivos de competición",
      "Tejido técnico transpirable de máxima calidad"
    ]
  },
  {
    id: "japan-anime-allstars",
    title: "Camisa Japón 🇯🇵 x Anime / Adidas",
    category: "anime",
    categoryLabel: "Camisetas Anime & Fútbol",
    price: 20000,
    priceFormatted: "20.000 CFA",
    size: "L",
    condition: "PRIMERA MANO",
    badge: "Primera Mano",
    featured: true,
    inStock: true,
    brand: "Adidas / Anime Collab",
    images: [
      `${BASE}images/japan-anime-front.jpeg`,
      `${BASE}images/japan-anime-folded.jpeg`,
      `${BASE}images/japan-anime-back.jpeg`
    ],
    description: "Diseño icónico con los personajes legendarios del anime: Son Goku (Dragon Ball), Naruto Uzumaki, Monkey D. Luffy (One Piece), Roronoa Zoro y Sasuke Uchiha en franjas horizontales estilo manga. Franjas Adidas en hombros y escudo JFA.",
    highlights: [
      "Artículo a estrenar (Primera Mano) con etiqueta",
      "Homenaje a los 5 animes más influyentes",
      "Degradado tonal en espalda en escala de grises",
      "Corte regular y tacto premium"
    ]
  },
  {
    id: "betis-naruto-shippuden",
    title: "Real Betis x Naruto Shippuden",
    category: "anime",
    categoryLabel: "Camisetas Anime & Fútbol",
    price: 20000,
    priceFormatted: "20.000 CFA",
    size: "M",
    condition: "PRIMERA MANO",
    badge: "Exclusivo",
    featured: true,
    inStock: true,
    brand: "Hummel x Naruto",
    images: [
      `${BASE}images/betis-naruto-front.jpeg`,
      `${BASE}images/betis-naruto-back.jpeg`
    ],
    description: "Colaboración inédita que fusiona los colores verde y blanco del Real Betis Balompié con el ninja de Konoha, Naruto Shippuden. Incorpora el escudo de la corona del Betis, flechas icónicas de Hummel y dibujo detallado de Naruto realizando técnicas ninja.",
    highlights: [
      "Diseño verde y blanco de coleccionista",
      "Grafismo de Naruto Shippuden en pecho y espalda",
      "Talla M con ajuste ergonómico deportivo",
      "Ideal para fanáticos del fútbol y del anime en Malabo"
    ]
  },
  {
    id: "harujiang-japan-polo",
    title: "Camiseta Harujiang Japón 🇯🇵",
    category: "polos-camisas",
    categoryLabel: "Polos & Camisas",
    price: 10000,
    priceFormatted: "10.000 CFA",
    size: "L",
    condition: "PRELOVED 10/10",
    badge: "Preloved 10/10",
    featured: false,
    inStock: true,
    brand: "Harujiang / Adidas JFA",
    images: [
      `${BASE}images/harujiang-polo-front.jpeg`,
      `${BASE}images/harujiang-polo-back.jpeg`
    ],
    description: "Polo técnico con pintura oriental de paisaje japonés: pagodas ancestrales, barca tradicional, montañas y el sol naciente con caligrafía kanji. Cuello camisero con cuello estampado a juego y tres botones frontales.",
    highlights: [
      "Pintura sumi-e tradicional en paisaje blanco y negro",
      "Cuello estructurado con botonadura",
      "Estado Preloved 10/10 sin marcas de uso",
      "Elegancia urbana y deportiva"
    ]
  },
  {
    id: "zara-lino-regular-fit",
    title: "Camisa Zara (Lino) Regular Fit 👔",
    category: "polos-camisas",
    categoryLabel: "Polos & Camisas",
    price: 10000,
    priceFormatted: "10.000 CFA",
    size: "L",
    condition: "PRELOVED 10/10",
    badge: "Puro Lino",
    featured: false,
    inStock: true,
    brand: "ZARA Man",
    images: [
      `${BASE}images/zara-lino-full.jpeg`,
      `${BASE}images/zara-lino-hanger.jpeg`,
      `${BASE}images/zara-lino-folded.jpeg`
    ],
    description: "Camisa clásica de lino genuino de ZARA con micro rayas finas verticales en azul celeste y blanco. Confección fresca y liviana, ideal para el clima tropical de Guinea Ecuatorial. Cuello italiano estructurado.",
    highlights: [
      "Tejido de lino natural de alta transpirabilidad",
      "Rayas verticales estilizadas azul cielo y blanco",
      "Corte Regular Fit cómodo y sofisticado",
      "Calificación Preloved 10/10"
    ]
  },
  {
    id: "bronx-polo-asos",
    title: "Polo The Bronx NYC - ASOS 🗽",
    category: "polos-camisas",
    categoryLabel: "Polos & Camisas",
    price: 5000,
    priceFormatted: "5.000 CFA",
    size: "M",
    condition: "PRELOVED 10/10",
    badge: "Streetwear",
    featured: false,
    inStock: true,
    brand: "ASOS Design",
    images: [
      `${BASE}images/bronx-polo-hanger.jpeg`,
      `${BASE}images/bronx-polo-flat.jpeg`
    ],
    description: "Polo retro urbano inspirado en los distritos de Nueva York. Confeccionado en tono verde menta pastel con cuello y tapeta de botones en gris marengo a contraste. Logotipo central circular The Bronx NYC con corona de laureles.",
    highlights: [
      "Color salvia vintage muy fácil de combinar",
      "Contraste bicolor cuello-cuerpo",
      "Corte contemporáneo talla M",
      "Precio accesible de 5.000 CFA"
    ]
  },
  {
    id: "zara-abstract-oversize",
    title: "Camiseta Oversize ZARA Abstract Pattern",
    category: "polos-camisas",
    categoryLabel: "Polos & Camisas",
    price: 5000,
    priceFormatted: "5.000 CFA",
    size: "XL",
    condition: "PRELOVED 9/10",
    badge: "Tendencia",
    featured: false,
    inStock: true,
    brand: "ZARA Man",
    images: [
      `${BASE}images/zara-abstract-flat.jpeg`,
      `${BASE}images/zara-abstract-folded.jpeg`
    ],
    description: "Camisa de manga corta veraniega con silueta oversize holgada. Presenta un tejido con textura seersucker/nido de abeja en gris perla decorado con trazos negros continuos de estilo abstracto.",
    highlights: [
      "Silueta Boxy / Oversize relajada",
      "Tejido con relieve y caída fresca",
      "Diseño abstracto contemporáneo",
      "Talla XL generosa y moderna"
    ]
  },
  {
    id: "scarface-pull-and-bear",
    title: "Camiseta Pull&Bear x Scarface 🎬",
    category: "streetwear",
    categoryLabel: "Streetwear & Cine",
    price: 5000,
    priceFormatted: "5.000 CFA",
    size: "L OVERSIZE",
    condition: "PRELOVED 10/10",
    badge: "Culto / Cine",
    featured: true,
    inStock: true,
    brand: "Pull&Bear / Universal Studios",
    images: [
      `${BASE}images/scarface-shirt-front.jpeg`,
      `${BASE}images/scarface-shirt-back.jpeg`,
      `${BASE}images/scarface-print-detail.jpeg`
    ],
    description: "Camiseta gráfica oficial de la película de culto Scarface (El Precio del Poder). Algodón lavado mineral color negro desgastado. Frontal con Tony Montana armado y frase 'Say hello to my little friend', dorso con póster panorámico en rojo y blanco.",
    highlights: [
      "Gráfica doble cara (pecho y espalda gigante)",
      "Tejido grueso vintage wash",
      "Ajuste L Oversize perfecto para streetwear",
      "Estado impecable 10/10"
    ]
  },
  {
    id: "westvill-cable-vest",
    title: "Chaleco Westvill '69 ⚓",
    category: "chalecos",
    categoryLabel: "Chalecos",
    price: 5000,
    priceFormatted: "5.000 CFA",
    size: "XL",
    condition: "PRELOVED 10/10",
    badge: "Old Money Style",
    featured: false,
    inStock: true,
    brand: "Westvill Athletic / Bershka",
    images: [
      `${BASE}images/westvill-vest-front.jpeg`,
      `${BASE}images/westvill-vest-back.jpeg`
    ],
    description: "Elegante chaleco sin mangas de punto trenzado grueso estilo universitario / preppy en color crema blanco marfil. Rayas deportivas azul marino en cuello en V, sisas y cintura. Escudo bordado Westvill '69 Athletic Club con corona dorada.",
    highlights: [
      "Tejido de punto trenzado clásico de alta densidad",
      "Bordado de alta calidad con hilos dorados y marinos",
      "Perfecto para llevar sobre camisetas o camisas",
      "Talla XL con gran porte"
    ]
  },
  {
    id: "mickey-mouse-cap",
    title: "Gorra Disney x Mickey Mouse 🧢",
    category: "gorras",
    categoryLabel: "Gorras & Accesorios",
    price: 5000,
    priceFormatted: "5.000 CFA",
    size: "Ajustable",
    condition: "NUEVO",
    badge: "Original Disney",
    featured: true,
    inStock: true,
    brand: "Disney Original",
    images: [
      `${BASE}images/mickey-cap-front.jpeg`,
      `${BASE}images/mickey-cap-side.jpeg`,
      `${BASE}images/mickey-cap-strap.jpeg`
    ],
    description: "Gorra dad cap estructurada de seis paneles confeccionada en algodón twill de tono rojo cereza. Cuenta con el bordado detallado clásico de Mickey Mouse caminando y una correa de ajuste trasera extra-larga con serigrafía 'MICKEY MOUSE'.",
    highlights: [
      "Bordado frontal multicolor en relieve",
      "Cinta trasera personalizada extensible con hebilla metálica",
      "Color rojo impactante para acentuar cualquier outfit",
      "Totalmente nueva"
    ]
  },
  {
    id: "vintage-rose-cap",
    title: "Gorra Gris Vintage Rose 🌹",
    category: "gorras",
    categoryLabel: "Gorras & Accesorios",
    price: 4000,
    priceFormatted: "4.000 CFA",
    size: "Ajustable",
    condition: "VINTAGE WASH",
    badge: "Bestseller",
    featured: false,
    inStock: true,
    brand: "THENZE Select",
    images: [
      `${BASE}images/vintage-rose-cap-front.jpeg`,
      `${BASE}images/vintage-rose-cap-angle1.jpeg`,
      `${BASE}images/vintage-rose-cap-angle2.jpeg`
    ],
    description: "Gorra de béisbol con tratamiento de lavado a la piedra ácido (acid wash) en color gris carbón desgastado. Delicado bordado floral de una rosa carmesí con tallo verde en el frontal. Visera precurvada y corona no estructurada.",
    highlights: [
      "Efecto desgastado acid wash exclusivo",
      "Bordado botánico minimalista y sobrio",
      "Cierre posterior de correa ajustable",
      "Precio especial de 4.000 CFA"
    ]
  }
];
