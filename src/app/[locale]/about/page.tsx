import { getI18n } from "@/locales/server";
import { Separator } from "@/comp/ui/separator";
import { PixelBlastBackground } from "@/comp/background";

export default async function About() {
  const t = await getI18n();

  return (
    <div className="flex-1 relative isolate overflow-hidden flex flex-col">
      <PixelBlastBackground />

      <div className="container mx-auto flex flex-1 flex-col justify-between gap-y-8 px-6 py-[clamp(1.5rem,5vh,5rem)]">
        {/* Hero — marca, não traduzida */}
        <section className="flex justify-end">
          <h1 className="text-6xl font-bold tracking-tighter sm:text-8xl lg:text-9xl italic">
            Dattos<span className="text-blue-600">Hub</span>
          </h1>
        </section>

        {/* What we do */}
        <section className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-start space-y-4 lg:max-w-md">
            <h2 className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl">
              {t("about.whatWeDo.pre")}
              <span className="text-blue-600">
                {t("about.whatWeDo.highlight")}
              </span>
              {t("about.whatWeDo.post")}
            </h2>
            <Separator className="w-24 bg-blue-600" />
            <p>{t("about.whatWeDoBody")}</p>
          </div>
          <div />
        </section>

        {/* How we do */}
        <section className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div />
          <div className="flex flex-col items-start space-y-4 lg:max-w-md">
            <h2 className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl">
              {t("about.howWeDo.pre")}
              <span className="text-blue-600">
                {t("about.howWeDo.highlight")}
              </span>
              {t("about.howWeDo.post")}
            </h2>
            <Separator className="w-24 bg-blue-600" />
            <p>{t("about.howWeDoBody")}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
