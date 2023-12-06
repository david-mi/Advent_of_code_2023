import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function getInputPath(url: string, filename: string) {
  const dirname = path.dirname(fileURLToPath(url));
  const parentDirname = path.resolve(dirname, "..")
  return path.join(parentDirname, "inputs", `${filename}.txt`);
}

export function parseInputToArray(inputPath: string) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" });
  return input.split(/\n/);
}