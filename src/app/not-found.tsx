import { Metadata } from "next";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white text-black px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          {`Oops! We couldn’t find what you’re looking for.`}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition rounded-md"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `Oops! The page you’re looking for doesn’t exist.`,
  openGraph: {
    title: "404 - Page Not Found",
    description: `We couldn’t find the page you were looking for. Try heading back to the homepage.`,
    url: "/404",
    siteName: "Preronaa",
    type: "website",
  },
};
