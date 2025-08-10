import Image from "next/image";
import Link from "next/link";

interface LinkProps {
  href: string;
  label: string;
}

// Define the links array
const navLinks: LinkProps[] = [
  { href: "#", label: "Home" },
  { href: "#about-us", label: "About Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <section className="bg-black">
      <div className="max-w-screen-xl px-4 py-10 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <Image
            className="h-16 w-auto"
            src="/ffwpu-pa.gif"
            alt="Unification Church - Richmond, BC"
            width={500}
            height={500}
          />
        </div>

        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          {navLinks.map((link) => (
            <div key={link.label} className="px-5 py-2">
              <a
                href={link.href}
                className="text-base leading-6 text-white hover:text-gray-500"
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>

        <div className="flex justify-center mt-8 space-x-6">
          <Link
            href="https://www.facebook.com/"
            className="text-white hover:text-gray-500"
          >
            <span className="sr-only">Facebook</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>

          <Link
            href="https://www.youtube.com/"
            className="text-white hover:text-gray-500"
          >
            <span className="sr-only">YouTube</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.596.419-7.814.419-7.814.419s-6.218 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.418-4.814a2.505 2.505 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <p className="mt-8 text-base leading-6 text-center text-white">
          © Unification Church - Richmond BC All rights reserved.
        </p>
      </div>
    </section>
  );
}
