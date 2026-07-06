"use client";
import Hero from "@/components/Hero";
import AchieveMore from "@/components/AchieveMore";
import ProductCatalog from "@/components/ProductCatalog";
import SolutionsSection from "@/components/SolutionsSection";
import AboutUs from "@/components/AboutUs";
import ClientsSection from "@/components/ClientsSection";
import IndustriesSection from "@/components/IndustriesSection";
import AllianceSection from "@/components/AllianceSection";
import Testimonials from "@/components/Testimonials";
import CounterSection from "@/components/CounterSection";
import CTASection from "@/components/CTASection";

function Home() {
  return (
    <>
      <Hero />
      <AchieveMore />
      <ProductCatalog />
      <SolutionsSection />
      <AboutUs />
      <ClientsSection />
      <IndustriesSection />
      <AllianceSection />
      <Testimonials />
      <CounterSection />
      <CTASection />
    </>
  );
}

export default Home;
