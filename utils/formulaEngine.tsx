"use client";

import { create, all } from "mathjs";

// ✅ create a full instance with all built-in functions
const math = create(all, {});

// ✅ explicitly register conditional + helper functions (for safety)
math.import({
  if: function (condition: boolean, a: number, b: number) {
    return condition ? a : b;
  },
  round2: function (value: number) {
    return Math.round(value * 100) / 100;
  },
}, { override: true });

export function evaluateFormula(
  formula: string,
  values: Record<string, number>,
  parameters: Record<string, number> = {}
): number {
  try {
    // Remove ${} syntax (backward compatibility)
    const cleanFormula = formula.replace(/\$\{(.*?)\}/g, "$1");

    // Merge input + parameters so both are accessible directly
    const context = { ...values, ...parameters };

    // ✅ evaluate with all functions enabled
    const result = math.evaluate(cleanFormula, context);

    if (typeof result === "number" && isFinite(result)) {
      return result;
    }

    console.warn("⚠️ Formula did not return numeric value:", result);
    return 0;
  } catch (error) {
    console.error("❌ Formula Error:", error, "\nFormula:", formula);
    return 0;
  }
}
