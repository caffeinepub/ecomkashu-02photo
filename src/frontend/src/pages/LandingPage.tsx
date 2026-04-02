import BeforeAfterSection from "../components/BeforeAfterSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import TestimonialsSection from "../components/TestimonialsSection";
import ToolPanel from "../components/ToolPanel";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <section id="tool" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Upload &amp; Enhance
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                Upload your product image and choose your enhancement style. Get
                professional results in seconds.
              </p>
            </div>
            <ToolPanel />
          </div>
        </section>
        <FeaturesSection />
        <BeforeAfterSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
