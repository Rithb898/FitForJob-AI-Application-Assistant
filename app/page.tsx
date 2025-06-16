import HeroSection from "@/sections/HeroSection";
import FeatureHighlight from "@/sections/FeatureHighlight";
import FeatureSection from "@/sections/FeatureSection";
import FinalCTASection from "@/sections/FinalCTASection";

export default function LandingPage() {
  return (
    <div className="text-slate-200">
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Highlight / How it Works Section */}
      <FeatureHighlight />

      {/* Features Section */}
      <FeatureSection />

      {/* Final CTA Section */}
      <FinalCTASection />
    </div>
  );
}
