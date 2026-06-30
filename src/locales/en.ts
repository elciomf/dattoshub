export default {
  nav: {
    about: "About",
    contact: "Contact",
  },
  footer: {
    copyright: "© {year} DattosHub",
    builtBy: "Built by {author}",
  },
  about: {
    whatWeDo: { pre: "What ", highlight: "we", post: " do?" },
    whatWeDoBody:
      "We build the full data infrastructure for your business — from pipelines to dashboards, turning raw data into decisions.",
    howWeDo: { pre: "How ", highlight: "we", post: " do?" },
    howWeDoBody:
      "We map, model, and surface everything on a single interactive hub, so your team sees the whole picture in one place.",
  },
  contact: {
    hero: { pre: "Get in ", highlight: "touch" },
    dropLine: { pre: "Drop us a ", highlight: "line" },
    body: "The fastest way to reach us. We read everything and usually get back within a couple of days.",
  },
  map: {
    mode: "Mode",
    product: "Product",
    year: "Year",
    from: "From",
    to: "To",
    threshold: "Above (t)",
    municipality: "Municipality",
    modes: {
      absolute: "Production (absolute)",
      trend: "Trend (% change)",
      condition: "Condition (above X)",
    },
    products: {
      apple: "Apple",
      banana: "Banana (bunch)",
      soy: "Soybean (grain)",
      corn: "Corn (grain)",
      tobacco: "Tobacco (leaf)",
      rice: "Rice (in husk)",
    },
    legend: {
      production: "Production (t)",
      trend: "Change {from}→{to}",
      condition: "Condition",
      above: "≥ {value} t",
      below: "< {value} t",
    },
    divLabels: {
      veryNegative: "≤ -50%",
      negative: "-50 to -10%",
      neutral: "-10 to +10%",
      positive: "+10 to +50%",
      veryPositive: "> +50%",
    },
    popup: {
      noData: "no data",
      unavailable: "change unavailable",
      conditionHit: "{value} t (✓ above {threshold} t)",
      conditionMiss: "{value} t (below {threshold} t)",
    },
  },
} as const;
