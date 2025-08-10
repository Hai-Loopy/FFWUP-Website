import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8 text-center">
      <h1 className="text-8xl font-bold text-[#a89076] mb-4 animate-pulse">
        404
      </h1>
      <h2 className="text-4xl font-semibold mb-3">Page Not Found</h2>
      <p className="text-lg text-gray-300 mb-8 max-w-md">
        Oops! It seems like the page you were looking for doesn&apos;t exist or has
        been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-[#a89076] text-black font-semibold rounded-md shadow-md transition-colors duration-200 ease-in-out hover:bg-[#8e7961] focus:outline-none focus:ring-2 focus:ring-[#a89076] focus:ring-offset-2 focus:ring-offset-black"
      >
        Return Home
      </Link>
    </div>
  );
}
