import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    quote:
      "My conversion rate jumped 40% after using ecomkashu.02photo! The white background quality is simply unmatched — looks like a professional studio shoot.",
    name: "Rahul S.",
    role: "Amazon Seller, Delhi",
    avatar: "RS",
  },
  {
    quote:
      "The white background feature is incredible. Saves me hours every week. I used to pay ₹500 per photo — now it's free and better quality!",
    name: "Priya M.",
    role: "Flipkart Seller, Mumbai",
    avatar: "PM",
  },
  {
    quote:
      "UGC images look so real. My ads finally convert! The cinematic 4K mode makes my D2C brand look premium without the premium price tag.",
    name: "Aditya K.",
    role: "D2C Brand Owner, Bangalore",
    avatar: "AK",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-background" id="pricing">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            What Sellers Say
          </span>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Loved by 10,000+ Ecommerce Sellers
          </h2>
          <p className="text-muted-foreground">
            Join thousands of sellers who are already boosting their sales with
            better product photos.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <Card className="h-full shadow-card hover:shadow-card-hover transition-shadow duration-200 rounded-2xl border border-border">
                <CardContent className="pt-6 pb-6 flex flex-col gap-4">
                  <Quote className="w-8 h-8 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Free pricing note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col items-center gap-3 bg-card border border-border rounded-3xl px-10 py-8 shadow-card">
            <div className="text-4xl font-extrabold text-foreground">
              ₹0{" "}
              <span className="text-lg font-normal text-muted-foreground line-through">
                ₹999
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Free forever — no credit card needed
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Unlimited images
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> 4K quality
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> No watermarks
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
