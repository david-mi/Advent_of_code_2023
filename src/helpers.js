import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export function getInputPath(url, filename) {
    const dirname = path.dirname(fileURLToPath(url));
    const parentDirname = path.resolve(dirname, "..");
    return path.join(parentDirname, "inputs", `${filename}.txt`);
}
export function parseInputToArray(input) {
    return input.split(/\n/);
}
