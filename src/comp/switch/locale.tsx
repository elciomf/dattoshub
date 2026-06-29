"use client";

import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/comp/ui/select";

const locales = [
  { code: "en", label: "en-US" },
  { code: "es", label: "es-ES" },
  { code: "pt", label: "pt-BR" },
] as const;

type Locale = (typeof locales)[number]["code"];

export function LocaleSwitcher() {
  const changeLocale = useChangeLocale();
  const current = useCurrentLocale();

  return (
    <Select
      value={current}
      onValueChange={(value) => changeLocale(value as Locale)}
    >
      <SelectTrigger size="sm" className="w-28" aria-label="Change language">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" className="z-[2000]">
        {locales.map((locale) => (
          <SelectItem key={locale.code} value={locale.code}>
            {locale.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
