import fs from "fs";
import path from "path";

/**
 * Safely loads all JSON calculators from /data folder
 * Runs only on the server side — never in the client.
 */
export function getCalculators() {
  try {
    const dataDir = path.join(process.cwd(), "data");

    if (!fs.existsSync(dataDir)) {
      console.error("❌ Data directory not found:", dataDir);
      return [];
    }

    const files = fs.readdirSync(dataDir);
    const calculators = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => {
        const content = fs.readFileSync(path.join(dataDir, file), "utf-8");
        return JSON.parse(content);
      });

    return calculators;
  } catch (error) {
    console.error("Error reading calculator files:", error);
    return [];
  }
}
