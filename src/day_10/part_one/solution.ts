import { setInputLinesToArray } from "../../helpers.js";
import { inputExample } from "./inputs/input_example.js";
import { input } from "./inputs/input.js";

interface Coordinates {
  x: number,
  y: number
}

type Tile = Coordinates & {
  symbol: string
}

const field = setInputLinesToArray(input)

function getFarthestPointFromStartingPosition(field: string[]) {
  const animalCoordinates = getAnimalCoordinates(field)
  const animalTile: Tile = { ...animalCoordinates, symbol: "S" }

  let previousTile = animalTile
  let currentTile = getNextToAnimalTile({ field, currentTile: animalTile })

  let steps = 1

  while (currentTile.symbol !== "S") {
    steps++
    const previousTileMemo = currentTile
    currentTile = getNextTile({ field, previousTile, currentTile })
    previousTile = previousTileMemo
  }

  return steps / 2
}

function getAnimalCoordinates(field: string[]): Coordinates {
  for (let y = 0; y < field.length; y++) {
    const line = field[y]!

    for (let x = 0; x < line.length; x++) {
      const cell = line[x]!

      if (cell === "S") {
        return { x, y }
      }
    }
  }

  return { x: 0, y: 0 }
}

interface GetNextTileProps {
  currentTile: Tile,
  previousTile: Tile | null,
  field: string[]
}

function getNextTile({ currentTile, previousTile, field }: GetNextTileProps): Tile {
  function isNextTileSameThanPrevious({ x, y }: Coordinates) {
    return (
      x !== previousTile?.x ||
      y !== previousTile?.y
    )
  }

  const symbols = {
    "-": [
      {
        y: currentTile.y,
        x: currentTile.x - 1,
      },
      {
        y: currentTile.y,
        x: currentTile.x + 1,
      }
    ].filter(isNextTileSameThanPrevious)[0]!,
    "|": [
      {
        y: currentTile.y - 1,
        x: currentTile.x,
      },
      {
        y: currentTile.y + 1,
        x: currentTile.x,
      }
    ].filter(isNextTileSameThanPrevious)[0]!,
    "7": [
      {
        y: currentTile.y,
        x: currentTile.x - 1,
      },
      {
        y: currentTile.y + 1,
        x: currentTile.x,
      }
    ].filter(isNextTileSameThanPrevious)[0]!,
    "J": [
      {
        y: currentTile.y - 1,
        x: currentTile.x,
      },
      {
        y: currentTile.y,
        x: currentTile.x - 1,
      }
    ].filter(isNextTileSameThanPrevious)[0]!,
    "L": [
      {
        y: currentTile.y,
        x: currentTile.x + 1,
      },
      {
        y: currentTile.y - 1,
        x: currentTile.x,
      }
    ].filter(isNextTileSameThanPrevious)[0]!,
    "F": [
      {
        y: currentTile.y + 1,
        x: currentTile.x,
      },
      {
        y: currentTile.y,
        x: currentTile.x + 1,
      }
    ].filter(isNextTileSameThanPrevious)[0]!
  }

  const { x, y } = symbols[currentTile.symbol as keyof typeof symbols]

  return {
    x,
    y,
    symbol: field[y]![x]!
  }
}

function getNextToAnimalTile({ currentTile, field }: Omit<GetNextTileProps, "previousTile">): Tile {
  const directions = [
    {
      y: currentTile.y - 1,
      x: currentTile.x,
      checker() {
        const tile = field[this.y]?.[this.x] || ""
        return "|F7".includes(tile)
      }
    },
    {
      y: currentTile.y,
      x: currentTile.x + 1,
      checker() {
        const tile = field[this.y]?.[this.x] || ""
        return "-7J".includes(tile)
      }
    },
    {
      y: currentTile.y + 1,
      x: currentTile.x,
      checker() {
        const tile = field[this.y]?.[this.x] || ""
        return "|LJ".includes(tile)
      }
    },
    {
      y: currentTile.y,
      x: currentTile.x - 1,
      checker() {
        const tile = field[this.y]?.[this.x] || ""
        return "-LF".includes(tile)
      }
    },
  ]

  for (const direction of directions) {
    const tile = field[direction.y]?.[direction.x]

    if (direction.checker()) {
      return {
        x: direction.x,
        y: direction.y,
        symbol: tile as string
      }
    }
  }

  return currentTile
}

export const day10PartOneSolution = getFarthestPointFromStartingPosition(field)