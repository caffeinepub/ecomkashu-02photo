import { Sparkles } from "lucide-react";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-foreground">
                ecomkashu
                <span className="text-muted-foreground font-normal">
                  .02photo
                </span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Free AI product image enhancer for ecommerce sellers. Get
              cinematic 4K white backgrounds, UGC images, and more — in seconds.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Features links */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4">
              Features
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "White Background",
                "Cinematic 4K",
                "UGC Images",
                "UGC Videos",
                "SEO Optimization",
              ].map((f) => (
                <li key={f}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {["About", "Blog", "Help Center", "Privacy Policy", "Terms"].map(
                (c) => (
                  <li key={c}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {c}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {year}. Built with <span className="text-red-400">♥</span>{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            Free for all ecommerce sellers — always.
          </p>
        </div>
      </div>
    </footer>
  );
}
