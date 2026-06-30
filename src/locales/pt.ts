export default {
  nav: {
    about: "Sobre",
    contact: "Contato",
  },
  footer: {
    copyright: "© {year} DattosHub",
    builtBy: "Feito por {author}",
  },
  about: {
    whatWeDo: { pre: "O que ", highlight: "fazemos", post: "?" },
    whatWeDoBody:
      "Construímos toda a infraestrutura de dados do seu negócio — de pipelines a dashboards, transformando dados brutos em decisões.",
    howWeDo: { pre: "Como ", highlight: "fazemos", post: "?" },
    howWeDoBody:
      "Mapeamos, modelamos e reunimos tudo em um único hub interativo, para o seu time enxergar o quadro completo em um só lugar.",
  },
  contact: {
    hero: { pre: "Fale ", highlight: "conosco" },
    dropLine: { pre: "Mande uma ", highlight: "mensagem" },
    body: "A forma mais rápida de falar com a gente. Lemos tudo e normalmente respondemos em alguns dias.",
  },
  map: {
    mode: "Modo",
    product: "Produto",
    year: "Ano",
    from: "De",
    to: "Até",
    threshold: "Acima de (t)",
    municipality: "Município",
    modes: {
      absolute: "Produção (absoluto)",
      trend: "Tendência (variação %)",
      condition: "Condição (acima de X)",
    },
    products: {
      apple: "Maçã",
      banana: "Banana (cacho)",
      soy: "Soja (em grão)",
      corn: "Milho (em grão)",
      tobacco: "Fumo (em folha)",
      rice: "Arroz (em casca)",
    },
    legend: {
      production: "Produção (t)",
      trend: "Variação {from}→{to}",
      condition: "Condição",
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
      noData: "sem dado",
      unavailable: "variação indisponível",
      conditionHit: "{value} t (✓ acima de {threshold} t)",
      conditionMiss: "{value} t (abaixo de {threshold} t)",
    },
  },
} as const;
