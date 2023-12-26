import { setInputLinesToArray } from "../../helpers.js";
import { input } from "./inputs/input.js";
import { inputExample } from "./inputs/inputExample.js";
import { type Coordinates, Direction } from "../types.js";
import { formatInputLine, Beam, Contraption } from "../part_one/solution.js"

const inputLine = setInputLinesToArray(input)!
const formattedInputLine = formatInputLine(inputLine)

function getBiggestEnergizedTilesCount(inputLine: string[]): number {
  let biggestEnergizedTilesCount = 0

  for (let y = 0; y < inputLine.length; y++) {
    for (let x = 0; x < inputLine[y]!.length; x++) {
      if (!isBeamOnEdge({ x, y })) continue

      const directions = defineBeamStartingDirection({ x, y })

      directions.forEach((direction) => {
        const contraption = new Contraption(inputLine)
        new Beam({ direction, x, y }, contraption)
        const { energizedTilesCount } = contraption

        if (energizedTilesCount > biggestEnergizedTilesCount) {
          biggestEnergizedTilesCount = energizedTilesCount
        }
      })
    }
  }

  return biggestEnergizedTilesCount
}

function isBeamOnEdge({ x, y }: Coordinates) {
  const isOnFirstOrLastRow = y === 0 || y === formattedInputLine.length - 1
  if (isOnFirstOrLastRow) return true

  const isOnFirstOrLastColumn = x === 0 || x === formattedInputLine[y]!.length - 1
  return isOnFirstOrLastColumn
}

function defineBeamStartingDirection({ x, y }: Coordinates): Direction[] {
  if (y === 0) {
    switch (x) {
      case 0: {
        return [Direction.DOWN, Direction.RIGHT]
      }
      case formattedInputLine[y]!.length - 1: {
        return [Direction.DOWN, Direction.LEFT]
      }
      default: {
        return [Direction.DOWN]
      }
    }
  }

  switch (x) {
    case 0: {
      return [Direction.UP, Direction.RIGHT]
    }
    case formattedInputLine[y]!.length - 1: {
      return [Direction.UP, Direction.LEFT]
    }
    default: {
      return [Direction.UP]
    }
  }
}

export const day16PartTwoSolution = getBiggestEnergizedTilesCount(formattedInputLine)