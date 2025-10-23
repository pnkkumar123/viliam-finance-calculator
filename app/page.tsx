import Script from "next/script";
import DynamicHomePage from "@/components/DynamicHomePage"; // new client component
import { getCalculators } from "@/lib/getCalculators";

export const metadata = {
  title: "Financial Calculators Platform | Dynamic Finance Tools",
  description:
    "Explore modular, JSON-driven financial calculators for tax, loans, ROI, savings, and more. Built for accuracy, scalability, and SEO optimization.",
  alternates: {
    canonical: "https://yourdomain.com/",
  },
  openGraph: {
    title: "Financial Calculators Platform",
    description:
      "Dynamic, data-driven calculators for finance and business users. Scalable and SEO-friendly.",
    url: "https://yourdomain.com/",
    siteName: "Financial Calculators Platform",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Calculators Platform",
    description:
      "A suite of JSON-driven financial calculators built for accuracy, scalability, and SEO.",
  },
};

export default function HomePage() {
  const calculators = getCalculators();

  return (
    <>
      {/* Pass calculator data to the client component */}
      <DynamicHomePage calculators={calculators} />

      {/* SEO Structured Data */}
      <Script
        id="ld-json-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Financial Calculators Platform",
            "url": "https://yourdomain.com/",
            "description":
              "Explore modular, JSON-driven financial calculators for tax, loan, ROI, savings and more.",
            "publisher": {
              "@type": "Organization",
              "name": "Financial Calculators Suite",
              "url": "https://yourdomain.com/",
            },
          }),
        }}
      />
    </>
  );
}
