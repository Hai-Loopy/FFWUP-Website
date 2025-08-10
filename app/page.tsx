import AboutUs from "@/components/layout/AboutUs";
import ContactUs from "@/components/layout/ContactUs";
import Gallery from "@/components/layout/Gallery";
import Hero from "@/components/layout/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Gallery />
      <ContactUs />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.5812353809965!2d-123.12475342376422!3d49.18953247137892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5486751f842e1a19%3A0x9a04a48fb196c4f!2s9291%20Walford%20St%2C%20Richmond%2C%20BC%20V6X%201P3!5e0!3m2!1sen!2sus!4v1754695519082!5m2!1sen!2sca"
        width="600"
        height="450"
        className="border-0 w-full mt-10"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </main>
  );
}
