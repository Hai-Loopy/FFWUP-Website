"use client";
import { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mkgzkrbd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setResult({
          success: true,
          message: "Your message has been sent successfully!",
        });
        form.reset(); // Clear the form
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="contact"
      name="contact"
      autoComplete="on"
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="sr-only">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-500 px-4 py-2 focus:outline-none focus:border-[#a89076] transition-colors"
            placeholder="Name"
            name="name"
            autoComplete="name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-500 px-4 py-2 focus:outline-none focus:border-[#a89076] transition-colors"
            placeholder="Email"
            name="email"
            autoComplete="email"
            required
          />
        </div>
        
        <div>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            cols={10}
            rows={5}
            className="w-full border border-gray-500 px-4 py-2 focus:outline-none focus:border-[#a89076] transition-colors resize-vertical"
            placeholder="Your Message..."
            name="message"
            required
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="focus:outline-none mt-5 bg-black px-4 py-2 text-white font-bold w-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
      
      {result && (
        <div
          className={`mt-4 p-3 rounded ${
            result.success 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
          role="alert"
        >
          {result.message}
        </div>
      )}
    </form>
  );
}
