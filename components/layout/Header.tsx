import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';

// Dynamically import LoginButton to avoid circular imports
const LoginButton = dynamic(() => import('../LoginButton'), {
  ssr: false,
  loading: () => <div className="px-4 py-2 text-sm text-white">Loading...</div>
})

interface LinkProps {
  href: string;
  label: string;
}

function NavLink({ href, label }: LinkProps) {
  return (
    <Link
      href={href}
      className="text-white hover:text-black py-2 px-4 hover:bg-white transition rounded-md lg:block hidden"
    >
      {label}
    </Link>
  );
}

function Logo() {
  return (
    <Link href="/" aria-label="Homepage">
      <Image
        src="/ffwpu-g2sh.gif"
        alt="Unification Church - Richmond, BC"
        className="lg:h-20 h-16 w-auto"
        width={500}
        height={500}
      />
    </Link>
  );
}

const navLinks: LinkProps[] = [
  { href: "/#", label: "Home" },
  { href: "/#about-us", label: "About Us" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

const logoInsertionIndex = Math.ceil(navLinks.length / 2);
const linksBeforeLogo = navLinks.slice(0, logoInsertionIndex);
const linksAfterLogo = navLinks.slice(logoInsertionIndex);

export default function Header() {
  return (
    <header className="bg-black w-full relative z-50">
      <div className="container mx-auto flex justify-between items-center h-28 px-4 sm:px-6 lg:px-8">
        {/* Left spacer for mobile */}
        <div className="w-8 lg:w-0"></div>
        
        {/* Center Navigation */}
        <nav
          className="flex justify-center items-center space-x-8 z-10"
          aria-label="Main Navigation"
        >
          {linksBeforeLogo.map((link) => (
            <NavLink key={link.label} href={link.href} label={link.label} />
          ))}
          <Logo />
          {linksAfterLogo.map((link) => (
            <NavLink key={link.label} href={link.href} label={link.label} />
          ))}
        </nav>
        
        {/* Right Side - Login Button */}
        <div className="flex items-center">
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
