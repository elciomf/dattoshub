"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import type { Feature, GeoJsonObject } from "geojson";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Input } from "@/comp/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/comp/ui/select";

// Sequencial (Blues) — para o modo absoluto
const PALETTE = ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"];

// Divergente (RdBu) — para variação %, centrada em 0
const DIV_BREAKS = [-50, -10, 10, 50]; // em %
const DIV_PALETTE = ["#ca0020", "#f4a582", "#f7f7f7", "#92c5de", "#0571b0"];
const DIV_LABELS = [
  "≤ -50%",
  "-50 a -10%",
  "-10 a +10%",
  "+10 a +50%",
  "> +50%",
];

const COND_HIT = "#08519c";
const COND_MISS = "#e5e7eb";

const NO_DATA_FILL = "#9ca3af"; // cinza claramente fora da escala
const DATA_OPACITY = 0.75;
const NO_DATA_OPACITY = 0.25; // translúcido: o mapa-base aparece por baixo

const PRODUCTS = [
  { code: "40260", label: "Maçã" },
  { code: "40136", label: "Banana (cacho)" },
  { code: "40124", label: "Soja (em grão)" },
  { code: "40122", label: "Milho (em grão)" },
  { code: "40113", label: "Fumo (em folha)" },
  { code: "40102", label: "Arroz (em casca)" },
];

const years = ["2024", "2023", "2022", "2021", "2020"];

const MODES = [
  { value: "absoluto", label: "Produção (absoluto)" },
  { value: "tendencia", label: "Tendência (variação %)" },
  { value: "condicao", label: "Condição (acima de X)" },
] as const;
type Mode = (typeof MODES)[number]["value"];

type PamRow = { D1C: string; D3C: string; D4C: string; V: string };

function code(f: Feature): string {
  const p = f.properties ?? {};
  return String(p.id ?? p.CD_MUN ?? p.codarea ?? "");
}
function getNome(f: Feature): string {
  const p = f.properties ?? {};
  return p.name ?? p.NM_MUN ?? p.nome ?? "Município";
}

// Índice município -> produção, para um (produto, ano)
function buildValueMap(rows: PamRow[], product: string, year: string) {
  const m = new Map<string, number>();
  for (const row of rows) {
    if (row.D4C !== product || row.D3C !== year) continue;
    const v = Number(row.V); // "-" / "..." viram NaN
    if (!Number.isNaN(v)) m.set(String(row.D1C), v);
  }
  return m;
}

export default function SimpleMap() {
  const [scmun, setScmun] = useState<GeoJsonObject | null>(null);
  const [pamsc, setPamsc] = useState<PamRow[]>([]);

  const [mode, setMode] = useState<Mode>("absoluto");
  const [product, setProduct] = useState("40124"); // Soja
  const [year, setYear] = useState("2024"); // absoluto + condição
  const [yearFrom, setYearFrom] = useState("2020"); // tendência (de)
  const [yearTo, setYearTo] = useState("2024"); // tendência (até)
  const [threshold, setThreshold] = useState(50000); // condição (t)

  useEffect(() => {
    Promise.all([
      fetch("/database/scmun.json").then((r) => r.json()),
      fetch("/database/pamsc.json").then((r) => r.json()),
    ]).then(([g, pam]) => {
      setScmun(g);
      setPamsc(Array.isArray(pam) ? pam.slice(1) : []); // descarta cabeçalho
    });
  }, []);

  const name = PRODUCTS.find((p) => p.code === product)?.label ?? "Produto";
  const fmt = (n: number) => n.toLocaleString("pt-BR");

  // Mapa de valores do ano único (absoluto / condição)
  const valAtual = useMemo(
    () => buildValueMap(pamsc, product, year),
    [pamsc, product, year],
  );
  // Mapas dos dois anos (tendência)
  const valDe = useMemo(
    () => buildValueMap(pamsc, product, yearFrom),
    [pamsc, product, yearFrom],
  );
  const valAte = useMemo(
    () => buildValueMap(pamsc, product, yearTo),
    [pamsc, product, yearTo],
  );

  // Quantis só fazem sentido no modo absoluto
  const thresholds = useMemo(() => {
    if (mode !== "absoluto") return [] as number[];
    const vals = [...valAtual.values()]
      .filter((v) => v > 0)
      .sort((a, b) => a - b);
    if (!vals.length) return [] as number[];
    const q = (p: number) => vals[Math.floor(p * (vals.length - 1))];
    return [q(0.2), q(0.4), q(0.6), q(0.8)];
  }, [mode, valAtual]);

  function corSeq(v: number) {
    if (!v) return NO_DATA_FILL;
    let i = 0;
    while (i < thresholds.length && v > thresholds[i]) i++;
    return PALETTE[i];
  }
  function corVar(pct: number) {
    let i = 0;
    while (i < DIV_BREAKS.length && pct > DIV_BREAKS[i]) i++;
    return DIV_PALETTE[i];
  }

  type Fill = { fillColor: string; fillOpacity: number };

  const noData: Fill = {
    fillColor: NO_DATA_FILL,
    fillOpacity: NO_DATA_OPACITY,
  };

  function fillStyleFor(c: string): Fill {
    if (mode === "absoluto") {
      const v = valAtual.get(c);
      if (v === undefined || v <= 0) return noData;
      return { fillColor: corSeq(v), fillOpacity: DATA_OPACITY };
    }
    if (mode === "condicao") {
      const v = valAtual.get(c);
      if (v === undefined) return noData;
      return {
        fillColor: v >= threshold ? COND_HIT : COND_MISS,
        fillOpacity: DATA_OPACITY,
      };
    }
    // tendência
    const a = valDe.get(c);
    const b = valAte.get(c);
    if (a === undefined || b === undefined || a <= 0) return noData;
    return {
      fillColor: corVar(((b - a) / a) * 100),
      fillOpacity: DATA_OPACITY,
    };
  }

  function popupFor(f: Feature): string {
    const c = code(f);
    const nome = `<strong>${getNome(f)}</strong>`;
    if (mode === "absoluto") {
      const v = valAtual.get(c) ?? 0;
      return `${nome}<br/>${name} · ${year}<br/>${v ? fmt(v) + " t" : "sem dado"}`;
    }
    if (mode === "condicao") {
      const v = valAtual.get(c);
      if (v === undefined) return `${nome}<br/>${name} · ${year}<br/>sem dado`;
      const tag = v >= threshold ? "✓ acima" : "abaixo";
      return `${nome}<br/>${name} · ${year}<br/>${fmt(v)} t (${tag} de ${fmt(threshold)} t)`;
    }
    const a = valDe.get(c);
    const b = valAte.get(c);
    if (a === undefined || b === undefined || a <= 0) {
      return `${nome}<br/>${name}<br/>variação indisponível`;
    }
    const pct = ((b - a) / a) * 100;
    const sinal = pct >= 0 ? "+" : "";
    return `${nome}<br/>${name} · ${yearFrom}→${yearTo}<br/>${fmt(a)} → ${fmt(b)} t<br/>${sinal}${pct.toFixed(1)}%`;
  }

  const hasData =
    mode === "tendencia"
      ? valDe.size > 0 && valAte.size > 0
      : valAtual.size > 0;

  // key precisa refletir tudo que muda a cor, senão o Leaflet
  // mantém o estilo antigo das camadas já desenhadas
  const geoKey = `${mode}-${product}-${year}-${yearFrom}-${yearTo}-${threshold}`;

  return (
    <div className="w-full h-full relative">
      <MapContainer
        zoom={7}
        center={[-27.5, -51]}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {scmun && hasData && (
          <GeoJSON
            key={geoKey}
            data={scmun}
            style={(feature) => {
              const f = fillStyleFor(code(feature as Feature));
              return {
                color: "#fff",
                weight: 0.5,
                fillColor: f.fillColor,
                fillOpacity: f.fillOpacity,
              };
            }}
            onEachFeature={(feature, layer) =>
              layer.bindPopup(popupFor(feature as Feature))
            }
          />
        )}
      </MapContainer>

      {/* Filtros */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2 rounded-lg border bg-background/95 p-3 shadow-md backdrop-blur">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium">Modo</span>
          <Select value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-[2000]">
              {MODES.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium">Produto</span>
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-[2000]">
              {PRODUCTS.map((p) => (
                <SelectItem key={p.code} value={p.code}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ano único (absoluto e condição) */}
        {mode !== "tendencia" && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">Ano</span>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[2000]">
                {years.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Dois anos (tendência) */}
        {mode === "tendencia" && (
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium">De</span>
              <Select value={yearFrom} onValueChange={setYearFrom}>
                <SelectTrigger className="w-[5.75rem]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[2000]">
                  {years.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium">Até</span>
              <Select value={yearTo} onValueChange={setYearTo}>
                <SelectTrigger className="w-[5.75rem]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[2000]">
                  {years.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Limiar (condição) */}
        {mode === "condicao" && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">Acima de (t)</span>
            <Input
              type="number"
              min={0}
              step={1000}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value) || 0)}
              className="w-48"
            />
          </div>
        )}
      </div>

      {/* Legenda */}
      <div className="absolute bottom-6 left-3 z-[1000] rounded-lg border bg-background/95 p-3 text-xs shadow-md backdrop-blur">
        {mode === "absoluto" && thresholds.length > 0 && (
          <>
            <p className="mb-1.5 font-semibold">Produção (t)</p>
            {PALETTE.map((cor, i) => {
              const lo = i === 0 ? 0 : thresholds[i - 1];
              const hi = thresholds[i];
              const label =
                i === PALETTE.length - 1
                  ? `> ${fmt(Math.round(thresholds[i - 1]))}`
                  : `${fmt(Math.round(lo))} – ${fmt(Math.round(hi))}`;
              return (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-sm border"
                    style={{ backgroundColor: cor }}
                  />
                  <span>{label}</span>
                </div>
              );
            })}
          </>
        )}

        {mode === "tendencia" && (
          <>
            <p className="mb-1.5 font-semibold">
              Variação {yearFrom}→{yearTo}
            </p>
            {DIV_PALETTE.map((cor, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-sm border"
                  style={{ backgroundColor: cor }}
                />
                <span>{DIV_LABELS[i]}</span>
              </div>
            ))}
          </>
        )}

        {mode === "condicao" && (
          <>
            <p className="mb-1.5 font-semibold">Condição</p>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-sm border"
                style={{ backgroundColor: COND_HIT }}
              />
              <span>≥ {fmt(threshold)} t</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-sm border"
                style={{ backgroundColor: COND_MISS }}
              />
              <span>&lt; {fmt(threshold)} t</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
