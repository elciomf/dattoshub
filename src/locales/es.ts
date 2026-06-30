export default {
  nav: {
    about: "Acerca de",
    contact: "Contacto",
  },
  footer: {
    copyright: "© {year} DattosHub",
    builtBy: "Hecho por {author}",
  },
  about: {
    whatWeDo: { pre: "¿Qué ", highlight: "hacemos", post: "?" },
    whatWeDoBody:
      "Construimos toda la infraestructura de datos de tu negocio — desde los pipelines hasta los dashboards, convirtiendo datos en bruto en decisiones.",
    howWeDo: { pre: "¿Cómo lo ", highlight: "hacemos", post: "?" },
    howWeDoBody:
      "Mapeamos, modelamos y reunimos todo en un único hub interactivo, para que tu equipo vea el panorama completo en un solo lugar.",
  },
  contact: {
    hero: { pre: "Ponte en ", highlight: "contacto" },
    dropLine: { pre: "Escríbenos un ", highlight: "mensaje" },
    body: "La forma más rápida de contactarnos. Leemos todo y solemos responder en un par de días.",
  },
  map: {
    mode: "Modo",
    product: "Producto",
    year: "Año",
    from: "Desde",
    to: "Hasta",
    threshold: "Por encima de (t)",
    municipality: "Municipio",
    modes: {
      absolute: "Producción (absoluto)",
      trend: "Tendencia (variación %)",
      condition: "Condición (por encima de X)",
    },
    products: {
      apple: "Manzana",
      banana: "Banana (racimo)",
      soy: "Soja (en grano)",
      corn: "Maíz (en grano)",
      tobacco: "Tabaco (en hoja)",
      rice: "Arroz (con cáscara)",
    },
    legend: {
      production: "Producción (t)",
      trend: "Variación {from}→{to}",
      condition: "Condición",
      above: "≥ {value} t",
      below: "< {value} t",
    },
    divLabels: {
      veryNegative: "≤ -50%",
      negative: "-50 a -10%",
      neutral: "-10 a +10%",
      positive: "+10 a +50%",
      veryPositive: "> +50%",
    },
    popup: {
      noData: "sin dato",
      unavailable: "variación no disponible",
      conditionHit: "{value} t (✓ por encima de {threshold} t)",
      conditionMiss: "{value} t (por debajo de {threshold} t)",
    },
  },
} as const;
