import { getInputPath, parseInputToArray } from "../../../helpers.js"
import { setEngineNumbers, getNumberAdjacentSymbol, type EngineNumber } from "../../part_one/solutions/part_one.js"

const engineLines = parseInputToArray(getInputPath(import.meta.url, "input"))
const engineNumbers = setEngineNumbers(engineLines)

function getEnginesNumbersSum(engineNumbers: EngineNumber[]) {
  const gearsData: Map<string, number> = new Map()

  return engineNumbers.reduce((engineNumberSum, engineNumber) => {
    const numberAdjacentSymbol = getNumberAdjacentSymbol(engineNumber, isCharGear, engineLines)

    if (numberAdjacentSymbol) {
      const { x, y } = numberAdjacentSymbol

      const keyIdentifier = `x-${x}-y-${y}`
      const gearCoordinate = gearsData.get(keyIdentifier)

      if (gearCoordinate) {
        engineNumberSum += gearCoordinate * engineNumber.value
      } else {
        gearsData.set(keyIdentifier, engineNumber.value)
      }
    }

    return engineNumberSum
  }, 0)
}

function isCharGear(char?: string) {
  return char === "*"
}

export const day03PartTwoSolution = getEnginesNumbersSum(engineNumbers)