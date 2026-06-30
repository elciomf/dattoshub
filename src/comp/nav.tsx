import Link from "next/link";
// import { Input } from "@/comp/ui/input";
import { getI18n } from "@/locales/server";
import { LocaleSwitcher } from "./switch/locale";
import { ThemeToggle } from "./switch/theme";

export async function Nav() {
  const t = await getI18n();

  const menu = [
    { text: t("nav.about"), aria: "About", link: "/about" },
    { text: t("nav.contact"), aria: "Contact", link: "/contact" },
  ];

  return (
    <header className="flex flex-row items-center justify-between px-4 py-2">
      <nav className="flex flex-row items-center space-x-6">
        <Link href={"/"} className="text-xl font-bold tracking-tighter">
          Dattos<span className="text-blue-600">Hub</span>
        </Link>
        <ul className="flex flex-row items-center space-x-4">
          {menu.map((item, index) => (
            <li
              key={index}
              className="whitespace-nowrap text-xs hover:text-blue-600"
            >
              <Link href={item.link}>{item.text}</Link>
            </li>
          ))}
        </ul>
        {/* <Input placeholder="Type to search..." /> */}
      </nav>
      <div className="flex flex-row items-center space-x-2">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
