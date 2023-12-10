import { setInputLinesToArray } from "../../helpers.js"
import { getCalibrationValuesSum } from "../part_one/solution.js"
import { input } from "../part_one/inputs/input.js"

const calibrationLines = setInputLinesToArray(input)

const charsNumbersMap = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9"
}
const numberWordsRegex = /one|two|three|four|five|six|seven|eight|nine/g

function formatCalibrationLines(calibrationLines: string[]) {
  return calibrationLines.map((calibrationLine) => {
    return calibrationLine
      /** 
       * first replace call is duplicates last letter of matched numbers to avoid caveheats as eightwo
       * wich would result as 8wo instead of 82 in the second replace call
       */
      .replace(numberWordsRegex, (matcher) => matcher + matcher.at(-1))
      .replace(numberWordsRegex, (matcher) => charsNumbersMap[matcher as keyof typeof charsNumbersMap])
  })
}

const formattedCalibationLines = formatCalibrationLines(calibrationLines)
export const day01PartTwoSolution = getCalibrationValuesSum(formattedCalibationLines)