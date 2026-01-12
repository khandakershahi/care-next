import AboutSection from "@/components/home/AboutSection";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesSection from "@/components/home/ServicesSection";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl pb-20">
      <Hero />
      <ServicesSection />
      <AboutSection />
      <HowItWorks />
    </main>
  );
}
