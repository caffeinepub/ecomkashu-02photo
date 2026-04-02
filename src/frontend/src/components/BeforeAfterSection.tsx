import { ArrowLeftRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function BeforeAfterSection() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section id="use-cases" className="py-20 px-4 bg-accent/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Before vs After
          </span>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            See the Transformation
          </h2>
          <p className="text-muted-foreground">
            Click to compare the original with our AI-enhanced 4K version.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden shadow-tool border border-border bg-card"
        >
          <div className="relative aspect-video md:aspect-[16/9]">
            {/* Before */}
            <img
              src="/assets/generated/product-demo-original.dim_600x600.jpg"
              alt="Original product before AI enhancement"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: showAfter ? 0 : 1 }}
            />
            {/* After */}
            <img
              src="/assets/generated/product-demo-enhanced.dim_600x600.jpg"
              alt="Enhanced 4K product on white background"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{
                opacity: showAfter ? 1 : 0,
                filter: showAfter
                  ? "brightness(1.12) contrast(1.08) saturate(0.92) drop-shadow(0 8px 32px rgba(0,0,0,0.1))"
                  : "none",
              }}
            />

            {/* Labels */}
            <div className="absolute top-4 left-4">
              <span className="bg-card/90 backdrop-blur text-xs font-bold text-foreground px-3 py-1.5 rounded-full border border-border">
                {showAfter ? "Enhanced 4K" : "Original"}
              </span>
            </div>

            {/* Toggle button */}
            <button
              type="button"
              onClick={() => setShowAfter((s) => !s)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setShowAfter((s) => !s);
              }}
              className="absolute inset-0 flex items-center justify-center group"
              data-ocid="before-after.toggle"
              aria-label="Toggle before/after comparison"
            >
              <div className="w-12 h-12 bg-card rounded-full shadow-card border border-border flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-150">
                <ArrowLeftRight className="w-5 h-5 text-foreground" />
              </div>
            </button>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Showing:</span>
              <span className="text-sm font-semibold text-foreground">
                {showAfter ? "✨ Enhanced 4K" : "📷 Original"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAfter((s) => !s)}
              className="text-sm font-medium text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
              data-ocid="before-after.secondary_button"
            >
              {showAfter ? "View Original" : "View Enhanced"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
