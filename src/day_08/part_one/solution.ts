import { setInputLinesToArray } from "../../helpers.js";
import { inputExample } from "./inputs/input_example.js";
import { input } from "./inputs/input.js";
import type { Destinations } from "./types.js";

const inputLines = setInputLinesToArray(input)
const directions = inputLines[0]!
const destinations = initializeDestinations(inputLines)
const destinationsList = Array.from(destinations.values())
const stepsCount = getStepsCount(getStartingPoint())

function getStepsCount(startingDestination: Destinations & { index: number }) {
  let steps = 0
  const { getCurrentDirection, setNextDirection } = initializeDirection(directions)

  let index = startingDestination.index

  while (true) {
    steps++
    const { left, right } = destinationsList[index]!
    const currentDirection = getCurrentDirection()
    const nextDirection = currentDirection === "L"
      ? left
      : right

    if (nextDirection === "ZZZ") {
      return steps
    }

    const nextDestination = destinations.get(nextDirection)!
    index = nextDestination.index

    setNextDirection()
  }
}

function getStartingPoint() {
  return destinations.get("AAA")!
}

export function initializeDirection(directions: string) {
  let currentDirectionIndex = 0

  return {
    getCurrentDirection() {
      return directions[currentDirectionIndex] as "L" | "R"
    },
    setNextDirection() {
      const nextDirectionIndex = currentDirectionIndex + 1

      if (directions[nextDirectionIndex]) {
        currentDirectionIndex++
      } else {
        currentDirectionIndex = 0
      }
    }
  }
}

export function initializeDestinations(inputLines: string[]) {
  const destinations = new Map<string, Destinations & { index: number }>()
  const directionsStartingLine = 2

  for (let i = directionsStartingLine; i < inputLines.length; i++) {
    const currentLine = inputLines[i]!
    const currentDestinations = getDestinationsFromLine(currentLine)

    destinations.set(currentDestinations.from, {
      ...currentDestinations,
      index: i - 2
    })
  }

  return destinations
}

export function getDestinationsFromLine(line: string): Destinations {
  const destinationsRegex = /\w{3}/g
  const destinationsMatch = line.match(destinationsRegex) as [string, string, string]

  return {
    from: destinationsMatch[0],
    left: destinationsMatch[1],
    right: destinationsMatch[2],
  }
}


export const day08PartOneSolution = stepsCount