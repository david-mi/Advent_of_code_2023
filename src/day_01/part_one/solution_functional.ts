import { parseInputToArray } from "../../helpers.js"
import { input } from "./inputs/input.js"

const calibrationLines = parseInputToArray(input)

/**
 * Non optimized version
 */

function getCalibrationValuesSum(calibrationLines: string[]) {
  return calibrationLines.reduce((calibrationValuesSum, calibrationLine) => {
    const firstCharNumber = calibrationLine[[...calibrationLine].findIndex(isCharNumber)]!
    const lastCharNumber = calibrationLine[[...calibrationLine].findLastIndex(isCharNumber)]!

    return calibrationValuesSum += (parseInt(firstCharNumber + lastCharNumber, 10))
  }, 0)
}

function isCharNumber(char: string) {
  return /\d/.test(char)
}

export const day01PartOneSolutionUnoptimized = getCalibrationValuesSum(calibrationLines)