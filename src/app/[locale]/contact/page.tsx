import { getI18n } from "@/locales/server";
import { Separator } from "@/comp/ui/separator";
import { PixelBlastBackground } from "@/comp/background";

export default async function Contact() {
  const t = await getI18n();

  return (
    <div className="flex-1 relative isolate overflow-hidden">
      <PixelBlastBackground />

      <div className="container mx-auto px-6 py-16 space-y-24 sm:py-24 sm:space-y-32">
        {/* Hero */}
        <section className="flex justify-start">
          <h1 className="text-6xl font-extrabold tracking-tighter sm:text-8xl lg:text-9xl">
            {t("contact.hero.pre")}
            <span className="text-blue-600">{t("contact.hero.highlight")}</span>
          </h1>
        </section>

        {/* E-mail */}
        <section className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-end">
          <div className="flex flex-col items-start space-y-6 lg:max-w-xl">
            <div className="space-y-4">
              <h2 className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl">
                {t("contact.dropLine.pre")}
                <span className="text-blue-600">
                  {t("contact.dropLine.highlight")}
                </span>
              </h2>
              <Separator className="w-24 bg-blue-600" />
            </div>
            <a
              href="mailto:dattoshub@gmail.com"
              className="text-3xl font-extrabold
            tracking-tighter underline-offset-8 transition-colors
            hover:underline sm:text-4xl lg:text-5xl"
            >
              dattoshub<span className="text-blue-600">@gmail.com</span>
            </a>
            <p>{t("contact.body")}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
