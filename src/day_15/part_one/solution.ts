import { setInputLinesToArray } from "../../helpers.js";
import { inputExample } from "./inputs/input_example.js";
import { input } from "./inputs/input.js";

export const inputLine = setInputLinesToArray(input)[0]!
const steps = splitLineIntoSteps(inputLine)

function getNumberHash(char: string, currentValue: number) {
  const asciiCode = char.charCodeAt(0)
  currentValue += asciiCode
  currentValue *= 17
  currentValue %= 256
  return currentValue
}

function splitLineIntoSteps(line: String) {
  return line.split(",")
}

function getStepValue(step: string) {
  let currentValue = 0

  for (const char of step) {
    currentValue = getNumberHash(char, currentValue)
  }

  return currentValue
}

export const day15PartOneSolution = steps.reduce((stepValue, step) => {
  return stepValue += getStepValue(step)
}, 0)
