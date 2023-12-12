import { setInputLinesToArray } from "../../helpers.js";
import { input } from "./inputs/input.js";
import { inputExample } from "./inputs/input_example.js";

const inputLines = setInputLinesToArray(input) as [string, string]

export interface Race {
  time: number,
  distanceRecord: number
}

const holdSpeedIncrement = 1
const races = getRacesData(inputLines)

function getRacesData(inputLines: [string, string]) {
  const times = getNumbersFromLine(inputLines[0]!)
  const distanceRecords = getNumbersFromLine(inputLines[1]!)
  return groupTimesWithdistanceRecords(times, distanceRecords)
}

function getNumbersFromLine(line: string) {
  const numberRegex = /\d+/g

  return line
    .match(numberRegex)!
    .map(Number)
}

function groupTimesWithdistanceRecords(times: number[], distanceRecords: number[]) {
  return times.map((time, index) => {
    return {
      time,
      distanceRecord: distanceRecords[index]!
    }
  })
}

export function getWaysToWinRaceCount({ time, distanceRecord }: Race) {
  let waysToWinRaceCount = 0

  for (let j = 1; j < time; j++) {
    const speedPerMS = j * holdSpeedIncrement
    const remainingRaceTime = time - j
    const canBeatRacedistanceRecord = speedPerMS * remainingRaceTime > distanceRecord

    if (canBeatRacedistanceRecord) {
      waysToWinRaceCount++
    }
  }

  return waysToWinRaceCount
}

export const day06PartOneSolution = races
  .map(getWaysToWinRaceCount)
  .reduce((result, waysToWinRaceCount) => result * waysToWinRaceCount)