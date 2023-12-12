import { setInputLinesToArray } from "../../helpers.js";
import { input } from "./inputs/input.js";
import { inputExample } from "./inputs/input_example.js";
import { getWaysToWinRaceCount, type Race } from "../part_one/solution.js";

const inputLines = setInputLinesToArray(input) as [string, string]
const race = getRaceData(inputLines)

function getRaceData(inputLines: [string, string]): Race {
  return {
    time: getNumberFromLine(inputLines[0]),
    distanceRecord: getNumberFromLine(inputLines[1])
  }
}

function getNumberFromLine(line: string) {
  const lineCharNumbers = line.replace(/[^\d]/g, "")

  return parseInt(lineCharNumbers, 10)
}

export const day06PartTwoSolution = getWaysToWinRaceCount(race)