import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: "🖼️",
    title: "White Background Removal",
    desc: "Professional studio-quality white backgrounds in seconds. Perfect for Amazon, Flipkart, Meesho, and all major marketplaces.",
  },
  {
    icon: "🎬",
    title: "Cinematic 4K Enhancement",
    desc: "Hollywood-grade product cinematography for your listings. Rich colors, depth-of-field, and cinematic lighting automatically applied.",
  },
  {
    icon: "📱",
    title: "UGC Content Generation",
    desc: "Authentic user-generated style content that converts. Get real-feeling product photos that build trust and drive purchases.",
  },
  {
    icon: "🚀",
    title: "SEO-Optimized Output",
    desc: "High-resolution 4K images optimized for all ecommerce platforms. Boost your organic ranking with perfectly formatted visuals.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Core Features
          </span>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything You Need to Sell More
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Professional-grade ecommerce visuals without the expensive
            photoshoot.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full shadow-card hover:shadow-card-hover transition-shadow duration-200 rounded-2xl border border-border">
                <CardContent className="pt-6 pb-6">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="font-bold text-base text-foreground mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
