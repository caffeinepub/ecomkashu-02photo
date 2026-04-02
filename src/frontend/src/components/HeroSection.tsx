import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollToTool = () => {
    document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-20 px-4">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.975 0.005 240) 0%, oklch(0.965 0.025 210) 50%, oklch(0.975 0.005 240) 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground w-fit">
              <Zap className="w-3 h-3 text-yellow-500 fill-yellow-400" />
              100% Free — No signup required
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
              Transform
              <br />
              Product Photos.
              <br />
              <span className="text-primary/80">Boost Ecommerce</span>
              <br />
              Sales.
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              The free AI tool built for ecommerce sellers. Get cinematic 4K
              white backgrounds, UGC-style images, and professional product
              visuals that convert — in seconds.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-card"
                onClick={scrollToTool}
                data-ocid="hero.primary_button"
              >
                Upload Your Product
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-6"
                onClick={scrollToTool}
                data-ocid="hero.secondary_button"
              >
                Try Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="text-green-500">✓</span> No watermarks
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-green-500">✓</span> 4K resolution
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-green-500">✓</span> Amazon &amp; Flipkart
                ready
              </span>
            </div>
          </motion.div>

          {/* Right: Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Sparkle accents */}
              <span className="sparkle absolute -top-4 -left-2 text-2xl select-none">
                ✦
              </span>
              <span
                className="sparkle absolute top-8 -right-4 text-lg select-none"
                style={{ animationDelay: "0.8s" }}
              >
                ✦
              </span>
              <span
                className="sparkle absolute -bottom-4 left-8 text-sm select-none"
                style={{ animationDelay: "1.4s" }}
              >
                ✦
              </span>

              <img
                src="/assets/generated/hero-transformation.dim_800x600.jpg"
                alt="AI transforms cluttered product shot to cinematic 4K studio quality"
                className="rounded-2xl shadow-tool w-full max-w-lg object-cover"
                loading="eager"
              />

              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-card px-4 py-2 flex items-center gap-2 border border-border">
                <span className="text-xl">🎬</span>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    Cinematic 4K
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Ultra HD Quality
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-card px-4 py-2 flex items-center gap-2 border border-border">
                <span className="text-xl">🖼️</span>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    White BG Removal
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Studio Quality
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
