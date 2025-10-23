"use client";
import { useState, useEffect } from "react";
import { evaluateFormula } from "../utils/formulaEngine";

interface Field {
  name: string;
  label: string;
  type: string;
  unit?: string;
}

interface CalculatorProps {
  title: string;
  description: string;
  fields: Field[];
  formula: string;
  outputLabel: string;
  parameters?: Record<string, number>;
  extraOutputs?: Record<string, string>;
}

export default function Calculator({
  title,
  description,
  fields,
  formula,
  outputLabel,
  parameters = {},
  extraOutputs = {},
}: CalculatorProps) {
  const [values, setValues] = useState<Record<string, number | undefined>>({});
  const [result, setResult] = useState<number | null>(null);
  const [extras, setExtras] = useState<Record<string, number>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsed = parseFloat(value);
    setValues((prev) => ({
      ...prev,
      [name]: isNaN(parsed) ? undefined : parsed,
    }));
  };

  // ✅ Reset values & results when switching calculators
  useEffect(() => {
    setValues({});
    setResult(null);
    setExtras({});
  }, [title]); // title changes when switching calculator

  // ✅ Auto recalculate dynamically when all fields filled
  useEffect(() => {
    const allFilled = fields.every(
      (f) => values[f.name] !== undefined && values[f.name] !== null
    );

    if (!allFilled) {
      setResult(null);
      setExtras({});
      return;
    }

    // ✅ Filter undefined safely
    const numericValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => typeof v === "number")
    ) as Record<string, number>;

    const mainResult = evaluateFormula(formula, numericValues, parameters);
    setResult(mainResult);

    if (extraOutputs) {
      const computedExtras: Record<string, number> = {};
      for (const [key, expr] of Object.entries(extraOutputs)) {
        computedExtras[key] = evaluateFormula(expr, {
          ...numericValues,
          formula: mainResult,
        });
      }
      setExtras(computedExtras);
    }
  }, [values]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      <form className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              step="any"
              value={values[field.name] ?? ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        ))}
      </form>

      {/* ✅ Always show result container for consistent UX */}
      <div className="mt-4 p-3 bg-gray-100 rounded-md text-center font-semibold">
        {result !== null
          ? `${outputLabel}: ${result.toFixed(2)}`
          : "Enter all values above to calculate"}
      </div>

      {/* ✅ Extra computed outputs */}
      {Object.keys(extras).length > 0 && (
        <div className="mt-3 space-y-2 text-center">
          {Object.entries(extras).map(([label, val]) => (
            <div key={label} className="font-medium">
              {label}: {val.toFixed(2)}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}
