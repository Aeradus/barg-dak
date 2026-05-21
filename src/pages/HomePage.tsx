/**
 * Agent C: Home page — assembles all sections into a single scrollable page.
 */

import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import ReviewsSection from "../components/ReviewsSection";
import ContactSection from "../components/ContactSection";
import SeoHead from "../components/SeoHead";
import { useLanguage } from "../i18n/language";

export default function HomePage(): React.ReactElement {
  const { language } = useLanguage();

  return (
    <>
      <SeoHead language={language} />
      <HeroSection />
      <ServicesSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
