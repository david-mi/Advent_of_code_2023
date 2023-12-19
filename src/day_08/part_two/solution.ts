import { setInputLinesToArray } from "../../helpers.js";
import { inputExample } from "./inputs/input_example.js";
import { input } from "./inputs/input.js";
import type { Destinations } from "./types.js";
import { getDestinationsFromLine, initializeDirection } from "../part_one/solution.js";

const inputLines = setInputLinesToArray(input)
const directions = inputLines[0]!
const { destinations, startingDestinationsIndexes } = initializeDestinations()
const destinationsList = Array.from(destinations.values())
const stepsCount = getStepsCount()

function getStepsCount() {
  let steps = 0
  const { getCurrentDirection, setNextDirection } = initializeDirection(directions)

  while (true) {
    steps++
    const currentDirection = getCurrentDirection()

    let matches = 0

    for (let i = 0; i < startingDestinationsIndexes.length; i++) {
      const index = startingDestinationsIndexes[i]!

      const { left, right } = destinationsList[index]!
      const nextDirection = currentDirection === "L"
        ? left
        : right

      if (nextDirection.endsWith("Z")) {
        matches++
        if (matches === startingDestinationsIndexes.length) {
          return steps
        }
      }

      const nextDestination = destinations.get(nextDirection)!
      startingDestinationsIndexes[i] = nextDestination.index
    }


    setNextDirection()
  }
}

export function initializeDestinations() {
  const destinations = new Map<string, Destinations & { index: number }>()
  const startingDestinationsIndexes = []
  const directionsStartingLine = 2

  for (let i = directionsStartingLine; i < inputLines.length; i++) {
    const currentLine = inputLines[i]!
    const currentDestinations = getDestinationsFromLine(currentLine)

    if (currentDestinations.from.endsWith("A")) {
      startingDestinationsIndexes.push(i - 2)
    }

    destinations.set(currentDestinations.from, {
      ...currentDestinations,
      index: i - 2
    })
  }

  return { destinations, startingDestinationsIndexes }
}

export const day08PartTwoSolution = stepsCount