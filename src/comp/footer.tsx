import Link from "next/link";
import { getI18n } from "@/locales/server";
import { Separator } from "./ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github, Linkedin } from "@hugeicons/core-free-icons";
// 1. Importe o componente de renderização que já veio instalado

export async function Footer() {
  const t = await getI18n();

  const social = [
    { icon: Github, link: "https://github.com/elciomf" },
    { icon: Linkedin, link: "https://linkedin.com/in/elciomf" },
  ];

  const menu = [
    { text: t("nav.about"), aria: "About", link: "/about" },
    { text: t("nav.contact"), aria: "Contact", link: "/contact" },
  ];

  return (
    <footer className="flex flex-col space-y-6 p-6 border-t">
      <nav className="flex flex-row items-center justify-between">
        <Link href={"/"} className="text-xl font-bold tracking-tighter">
          Dattos<span className="text-blue-600">Hub</span>
        </Link>
        <ul className="flex flex-row space-x-3">
          {social.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>
                <HugeiconsIcon icon={item.icon} size={16} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav>
        <ul className="flex flex-row items-center space-x-4">
          {menu.map((item, index) => (
            <li key={index}>
              <Link href={item.link} className="text-sm font-bold">
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Separator />
      <nav className="flex flex-row items-center justify-between">
        <p>@ 2026 DattosHub</p>
        <p>Built by elciomf</p>
      </nav>
    </footer>
  );
}
