'use client'

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react'

/* eslint-disable @typescript-eslint/no-explicit-any */

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

function LoginButtons() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="bg-yellow-500 px-4 py-2 text-sm text-black rounded">
        Loading...
      </div>
    )
  }

  if (session) {
    // User is logged in
    return (
      <div className="flex items-center space-x-2">
        <span className="text-white text-sm hidden sm:block">
          {session.user?.name}
        </span>
        
        {/* Show admin panel link if user is admin */}
        {(session.user as any)?.role === 'admin' && (
          <Link 
            href="/admin"
            className="text-white hover:text-black py-2 px-3 hover:bg-white transition rounded-md text-sm"
          >
            Admin
          </Link>
        )}
        
        <Link 
          href="/dashboard"
          className="text-white hover:text-black py-2 px-3 hover:bg-white transition rounded-md text-sm"
        >
          Dashboard
        </Link>
        
        <button
          onClick={() => signOut()}
          className="text-white hover:text-black py-2 px-3 hover:bg-white transition rounded-md text-sm"
        >
          Sign Out
        </button>
      </div>
    )
  }

  // User is not logged in - ALWAYS show these buttons
  return (
    <div className="flex items-center space-x-2">
      <Link
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="border border-white text-white hover:bg-white hover:text-black py-2 px-4 rounded text-sm transition"
      >
        Register
      </Link>
    </div>
  )
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
        
        {/* Right Side - Login Buttons */}
        <div className="flex items-center">
          <LoginButtons />
        </div>
      </div>
    </header>
  );
}
