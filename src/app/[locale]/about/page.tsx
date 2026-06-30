import Image from "next/image";
import { Separator } from "@/comp/ui/separator";

export default function About() {
  return (
    <div className="flex-1">
      <div className="container mx-auto px-6 py-12 space-y-24 sm:py-24 sm:space-y-32">
        {/* Hero */}
        <section className="flex justify-end">
          <h1 className="text-6xl font-extrabold tracking-tighter sm:text-8xl lg:text-9xl">
            Dattos<span className="text-blue-600">Hub</span>
          </h1>
        </section>

        {/* What we do — texto / imagem */}
        <section className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-start space-y-4 lg:max-w-md">
            <h2 className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl">
              What <span className="text-blue-600">we</span> do?
            </h2>
            <Separator className="w-24 bg-blue-600" />
            <p className="text-muted-foreground">
              We build the full data infrastructure for your business — from
              pipelines to dashboards, turning raw data into decisions.
            </p>
          </div>
          <div />
        </section>

        {/* How we do — imagem / texto (flip), texto-primeiro no mobile */}
        <section className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div />

          <div className="flex flex-col items-start space-y-4 lg:max-w-md">
            <h2 className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl">
              How <span className="text-blue-600">we</span> do?
            </h2>
            <Separator className="w-24 bg-blue-600" />
            <p className="text-muted-foreground">
              We map, model, and surface everything on a single interactive hub,
              so your team sees the whole picture in one place.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
