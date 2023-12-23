import { setInputLinesToArray } from "../../helpers.js";
import { inputExample } from "./inputs/input_example.js";
import { drawPlatform, tiltPlatformToNorth, getTotalLoadOnNorthSupportBeams, type Coordinates } from "../part_one/solution.js";
import { input } from "./inputs/input.js";

export const inputLine = setInputLinesToArray(input)
const platform = drawPlatform(inputLine)

const loadsStorageBeforeLoop = getLoadsStorageBeforeLoop(platform)
const cyclesAmountBeforeLoop = loadsStorageBeforeLoop.size
const cyclesAmountToTest = 1_000_000_000
const remainingsCycles = cyclesAmountToTest - Math.floor(cyclesAmountToTest / cyclesAmountBeforeLoop) * cyclesAmountBeforeLoop + 1
const totalLoadAfterCycles = getTotalLoadAfterCycles(platform, remainingsCycles)

function getLoadsStorageBeforeLoop(platform: string[][]) {
  const loadsStorageBeforeLoop = new Map<number, number>()
  let cycleCount = 0

  while (true) {
    tiltPlatformToNorth(platform)
    tiltPlatformToWest(platform)
    tiltPlatformToSouth(platform)
    tiltPlatformToEast(platform)
    const totalLoadOnNorthSupportBeams = getTotalLoadOnNorthSupportBeams(platform)
    const load = loadsStorageBeforeLoop.get(totalLoadOnNorthSupportBeams)

    if (load !== undefined) return loadsStorageBeforeLoop

    cycleCount++
    loadsStorageBeforeLoop.set(totalLoadOnNorthSupportBeams, cycleCount)
  }
}

function getTotalLoadAfterCycles(platform: string[][], cyclesAmount: number) {
  for (let i = 0; i < cyclesAmount; i++) {
    tiltPlatformToNorth(platform)
    tiltPlatformToWest(platform)
    tiltPlatformToSouth(platform)
    tiltPlatformToEast(platform)
  }

  return getTotalLoadOnNorthSupportBeams(platform)
}

function tiltPlatformToWest(platform: string[][]) {
  for (let y = 0; y < platform.length; y++) {
    const row = platform[y]!

    for (let x = 1; x < row.length; x++) {
      const element = row[x]!
      if (element !== "O") continue

      let newRockCoordinates: Coordinates | null = null

      for (let forwardX = x - 1; forwardX >= 0; forwardX--) {
        const previousElement = platform[y]![forwardX]!
        if (previousElement !== ".") break

        newRockCoordinates = { y, x: forwardX }
      }

      if (newRockCoordinates !== null) {
        platform[newRockCoordinates.y]![newRockCoordinates.x]! = "O"
        platform[y]![x]! = "."
      }
    }
  }
}

function tiltPlatformToSouth(platform: string[][]) {
  for (let ascendingY = platform.length - 2; ascendingY >= 0; ascendingY--) {
    const row = platform[ascendingY]!

    for (let x = 0; x < row.length; x++) {
      const element = row[x]!
      if (element !== "O") continue

      let newRockCoordinates: Coordinates | null = null

      for (let descendingY = ascendingY + 1; descendingY < platform.length; descendingY++) {
        const previousElement = platform[descendingY]![x]!
        if (previousElement !== ".") break

        newRockCoordinates = { y: descendingY, x }
      }

      if (newRockCoordinates !== null) {
        platform[newRockCoordinates.y]![newRockCoordinates.x]! = "O"
        platform[ascendingY]![x]! = "."
      }
    }
  }
}

function tiltPlatformToEast(platform: string[][]) {
  for (let y = 0; y < platform.length; y++) {
    const row = platform[y]!

    for (let x = row.length - 2; x >= 0; x--) {
      const element = row[x]!
      if (element !== "O") continue

      let newRockCoordinates: Coordinates | null = null

      for (let forwardX = x + 1; forwardX < row.length; forwardX++) {
        const previousElement = platform[y]![forwardX]!
        if (previousElement !== ".") break

        newRockCoordinates = { y, x: forwardX }
      }

      if (newRockCoordinates !== null) {
        platform[newRockCoordinates.y]![newRockCoordinates.x]! = "O"
        platform[y]![x]! = "."
      }
    }
  }
}

export const day14PartTwoSolution = totalLoadAfterCycles
