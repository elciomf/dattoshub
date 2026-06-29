"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Feature, GeoJsonObject } from "geojson";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Escala sequencial Blues (5 classes)
const PALETTE = ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"];

const PRODUTOS = [
  { code: "40260", label: "Maçã" },
  { code: "40136", label: "Banana (cacho)" },
  { code: "40124", label: "Soja (em grão)" },
  { code: "40122", label: "Milho (em grão)" },
  { code: "40113", label: "Fumo (em folha)" },
  { code: "40102", label: "Arroz (em casca)" },
];

const ANOS = ["2024", "2023", "2022", "2021", "2020"];

function getCodigo(f: Feature): string {
  const p = f.properties ?? {};
  return String(p.id ?? p.CD_MUN ?? p.codarea ?? "");
}
function getNome(f: Feature): string {
  const p = f.properties ?? {};
  return p.name ?? p.NM_MUN ?? p.nome ?? "Município";
}

export default function SimpleMap() {
  const [scmunData, setScmunData] = useState<GeoJsonObject | null>(null);
  const [pamData, setPamData] = useState<any[]>([]);

  // Filtros
  const [produtoCod, setProdutoCod] = useState("40124"); // Soja
  const [ano, setAno] = useState("2024");

  useEffect(() => {
    Promise.all([
      fetch("/json/scmun.json").then((r) => r.json()),
      fetch("/json/pamsc.json").then((r) => r.json()),
    ]).then(([scmun, pam]) => {
      setScmunData(scmun);
      setPamData(Array.isArray(pam) ? pam.slice(1) : []); // descarta o cabeçalho
    });
  }, []);

  const produtoLabel =
    PRODUTOS.find((p) => p.code === produtoCod)?.label ?? "Produto";

  // Índice: código do município -> valor, já filtrado por produto + ano
  const valorPorMunicipio = useMemo(() => {
    const map = new Map<string, number>();
    for (const row of pamData) {
      if (row.D4C !== produtoCod) continue;
      if (row.D3C !== ano) continue;
      const v = Number(row.V); // "-" e "..." viram NaN (sem dado)
      if (!Number.isNaN(v)) map.set(String(row.D1C), v);
    }
    return map;
  }, [pamData, produtoCod, ano]);

  // Limiares por QUANTIL — produção é muito assimétrica; sem isso o mapa
  // fica quase todo claro com 1 ou 2 manchas escuras.
  const thresholds = useMemo(() => {
    const vals = [...valorPorMunicipio.values()]
      .filter((v) => v > 0)
      .sort((a, b) => a - b);
    if (!vals.length) return [] as number[];
    const q = (p: number) => vals[Math.floor(p * (vals.length - 1))];
    return [q(0.2), q(0.4), q(0.6), q(0.8)];
  }, [valorPorMunicipio]);

  function corPorValor(v: number) {
    if (!v) return "#f7f7f7"; // sem dado
    let i = 0;
    while (i < thresholds.length && v > thresholds[i]) i++;
    return PALETTE[i];
  }

  const fmt = (n: number) => n.toLocaleString("pt-BR");

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

        {scmunData && valorPorMunicipio.size > 0 && (
          <GeoJSON
            // a key precisa mudar com o filtro, senão o Leaflet
            // mantém o estilo antigo das camadas já desenhadas
            key={`${produtoCod}-${ano}`}
            data={scmunData}
            style={(feature) => {
              const v =
                valorPorMunicipio.get(getCodigo(feature as Feature)) ?? 0;
              return {
                color: "#fff",
                weight: 0.5,
                fillColor: corPorValor(v),
                fillOpacity: 0.75,
              };
            }}
            onEachFeature={(feature, layer) => {
              const f = feature as Feature;
              const v = valorPorMunicipio.get(getCodigo(f)) ?? 0;
              layer.bindPopup(
                `<strong>${getNome(f)}</strong><br/>` +
                  `${produtoLabel} · ${ano}<br/>` +
                  `${v ? fmt(v) + " t" : "sem dado"}`,
              );
            }}
          />
        )}
      </MapContainer>

      {/* Filtros */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2 rounded-lg border bg-background/95 p-3 shadow-md backdrop-blur">
        <Select value={produtoCod} onValueChange={setProdutoCod}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Produto" />
          </SelectTrigger>
          <SelectContent className="z-[2000]">
            {PRODUTOS.map((p) => (
              <SelectItem key={p.code} value={p.code}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={ano} onValueChange={setAno}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent className="z-[2000]">
            {ANOS.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Legenda */}
      {thresholds.length > 0 && (
        <div className="absolute bottom-6 left-3 z-[1000] rounded-lg border bg-background/95 p-3 text-xs shadow-md backdrop-blur">
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
        </div>
      )}
    </div>
  );
}
