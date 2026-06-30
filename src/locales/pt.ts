export default {
  // Nav
  "nav.about": "Sobre",
  "nav.contact": "Contato",

  // Map
  "map.product": "Produto",
  "map.year": "Ano",

  about: {
    eyebrow: "About",
    title: "Mapping data, end to end.",
    lead: "DattosHub turns scattered geospatial data into something you can explore.",
    body: {
      first: "Texto do primeiro parágrafo sobre o produto.",
      second: "Segundo parágrafo: contexto, missão, o que diferencia.",
    },
    values: {
      data: { title: "Unified data", description: "Tudo num lugar só." },
      maps: { title: "Built on maps", description: "Geoespacial no centro." },
      open: {
        title: "Open by default",
        description: "Transparente e acessível.",
      },
    },
  },

  contact: {
    title: "Get in touch",
    lead: "Dúvida, feedback ou um dataset que você quer no mapa? Manda ver.",
    info: {
      email: { label: "Email" },
      location: { label: "Location", value: "Remote · Worldwide" },
    },
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send message",
      sending: "Sending…",
      success: "Valeu! A gente responde em breve.",
      error: "Algo deu errado. Tenta de novo.",
    },
  },
} as const;
