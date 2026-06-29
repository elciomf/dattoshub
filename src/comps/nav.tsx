import { Input } from "@/components/ui/input";
import Link from "next/link";

export function Nav() {
  const menu = [
    {
      text: "About",
      aria: "About",
      link: "/about",
    },
    {
      text: "Contact",
      aria: "Contact",
      link: "/contact",
    },
  ];
  const acts = [
    {
      text: "pt-BR",
      aria: "Language",
      func: "",
    },
  ];

  return (
    <header className="flex flex-row items-center justify-between px-4 py-2">
      <nav className="flex flex-row items-center space-x-4">
        <Link href={"/"} className="text-lg font-bold tracking-tighter">
          Dattos<span className="text-blue-600">Hub</span>
        </Link>
        <ul className="flex flex-row items-center space-x-2">
          {/* Menu */}
          {menu.map((item, index) => (
            <li key={index} className="text-xs hover:text-blue-600">
              <Link href={item.link}>{item.text}</Link>
            </li>
          ))}
        </ul>
        <Input placeholder="Type to search..." />
      </nav>
      <nav>
        <ul>
          {/* Acts */}
          {acts.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
