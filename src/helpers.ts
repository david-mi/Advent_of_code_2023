import fs from "fs";
export function setInputLinesToArray(input: string) {
  return input.split(/\n/);
}