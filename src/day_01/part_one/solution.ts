import { parseInputToArray } from "../../helpers.js"
import { input } from "../inputs/input.js"

const calibrationLines = parseInputToArray(input)

export function getCalibrationValuesSum(calibrationLines: string[]) {
  let calibrationValuesSum = 0

  for (const calibrationLine of calibrationLines) {
    const calibrationLineValue = getFirstCharNumber(calibrationLine) + getLastCharNumber(calibrationLine)
    calibrationValuesSum += parseInt(calibrationLineValue, 10)
  }

  return calibrationValuesSum
}

function isCharNumber(char: string) {
  return /\d/.test(char)
}

function getFirstCharNumber(chars: string) {
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]!

    if (isCharNumber(char)) {
      return char
    }
  }

  return ""
}

function getLastCharNumber(chars: string): string {
  for (let i = chars.length - 1; i >= 0; i--) {
    const char = chars[i]!

    if (isCharNumber(char)) {
      return char
    }
  }

  return ""
}

export const day01PartOneSolution = getCalibrationValuesSum(calibrationLines)