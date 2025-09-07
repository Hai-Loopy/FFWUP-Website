import Header from "@/components/layout/Header";
import AboutUs from "@/components/layout/AboutUs";
import ContactUs from "@/components/layout/ContactUs";
import Gallery from "@/components/layout/Gallery";
import Hero from "@/components/layout/Hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutUs />
      <Gallery />
      <ContactUs />
      {/* Google Maps iframe */}
    </main>
  );
}