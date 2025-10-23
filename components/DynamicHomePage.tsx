"use client";

import { useState } from "react";
import Calculator from "@/components/Calculator";

interface DynamicHomePageProps {
  calculators: any[];
}

export default function DynamicHomePage({ calculators }: DynamicHomePageProps) {
  const [activeCalc, setActiveCalc] = useState(
    calculators.find((c) => c.id === "tax") || calculators[0]
  );

  if (!calculators.length) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        ❌ No calculator data found.
      </div>
    );
  }

  const article = activeCalc?.article || [];

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6 lg:px-16">
      {/* Hero / Header */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Financial Calculators Platform
        </h1>
        
      </section>

      {/* Main Layout: Sidebar + Calculator + Article */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {/* LEFT SIDEBAR (Calculator Categories) */}
        <aside className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 h-fit sticky top-10 self-start">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center lg:text-left">
            Calculators
          </h3>

          <div className="flex lg:flex-col flex-wrap gap-3 justify-center lg:justify-start">
            {calculators.map((calc) => (
              <button
                key={calc.id}
                onClick={() => setActiveCalc(calc)}
                className={`w-full text-left border rounded-lg p-3 text-sm transition-all duration-200 ${
                  activeCalc.id === calc.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-400"
                }`}
              >
                <span className="font-medium">{calc.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* RIGHT PANEL (Active Calculator + Article) */}
        <section className="lg:col-span-3 bg-white rounded-2xl shadow-md p-6 transition-all duration-300 ease-in-out">
          {/* Calculator */}
          <Calculator key={activeCalc.id} {...activeCalc} />

          {/* Educational Article */}
          {article.length > 0 && (
            <div className="mt-10 space-y-8">
              {article.map((section: any, i: number) => (
                <div key={i} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {section.heading}
                  </h3>

                  {section.content && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  )}

                  {section.list && (
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      {section.list.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.steps && (
                    <ol className="list-decimal pl-6 text-gray-700 space-y-1">
                      {section.steps.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ol>
                  )}

                  {section.formula && (
                    <div className="mt-3 p-3 bg-gray-100 rounded-md font-mono text-gray-900">
                      {section.formula}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Financial Calculators Suite – Dynamic, Configurable, Scalable.
      </footer>
    </main>
  );
}
