import fs from "fs";
import path from "path";
import Calculator from "@/components/Calculator";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // ✅ unwrap Promise
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, `${resolvedParams.id}.json`);

  if (!fs.existsSync(filePath)) {
    return {
      title: "Calculator Not Found | Financial Calculators Platform",
      description: "The requested calculator could not be found.",
    };
  }

  const file = fs.readFileSync(filePath, "utf-8");
  const config = JSON.parse(file);

  return {
    title: `${config.title} | Financial Calculators Platform`,
    description: config.description,
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // ✅ unwrap Promise
  const id = resolvedParams.id;

  if (!id) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        ❌ Missing calculator ID.
      </div>
    );
  }

  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, `${id}.json`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        ❌ Calculator not found: {id}
      </div>
    );
  }

  const file = fs.readFileSync(filePath, "utf-8");
  const config = JSON.parse(file);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Calculator key={config.id} {...config} />
    </div>
  );
}
