import { setInputLinesToArray } from "../../helpers.js";
import { inputExample } from "./inputs/input_example.js";
import { input } from "./inputs/input.js";

export const inputLine = setInputLinesToArray(input)
const platform = drawPlatform(inputLine)
tiltPlatformToNorth(platform)
const totalLoadOnNorthSupportBeams = getTotalLoadOnNorthSupportBeams(platform)

interface Coordinates {
  x: number,
  y: number
}

export function getTotalLoadOnNorthSupportBeams(platform: string[][]) {
  return platform.reduce((totalLoadOnNorthSupportBeams, row, rowIndex) => {
    return totalLoadOnNorthSupportBeams += row.reduce((rowLoads, element) => {
      if (element === "O") {
        rowLoads += platform.length - rowIndex
      }
      return rowLoads
    }, 0)
  }, 0)
}

export function tiltPlatformToNorth(platform: string[][]) {
  for (let descendingY = 1; descendingY < platform.length; descendingY++) {
    const row = platform[descendingY]!

    for (let x = 0; x < row.length; x++) {
      const element = row[x]!
      if (element !== "O") continue

      let newRockCoordinates: Coordinates | null = null


      for (let ascendingY = descendingY - 1; ascendingY >= 0; ascendingY--) {
        const previousElement = platform[ascendingY]![x]!
        if (previousElement !== ".") break

        newRockCoordinates = { y: ascendingY, x }
      }

      if (newRockCoordinates !== null) {
        platform[newRockCoordinates.y]![newRockCoordinates.x]! = "O"
        platform[descendingY]![x]! = "."
      }
    }
  }
}

export function drawPlatform(inputLine: string[]) {
  return inputLine.map((inputLine) => {
    return Array.from(inputLine)
  })
}

export const day14PartOneSolution = totalLoadOnNorthSupportBeams
