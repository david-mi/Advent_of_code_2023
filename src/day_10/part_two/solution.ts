import { setInputLinesToArray } from "../../helpers.js";
import { inputExample } from "./inputs/input_example.js";
import { input } from "./inputs/input.js";
import { writeFile } from "fs/promises";
import { getAnimalCoordinates, getNextTile, getNextToAnimalTile, type Tile } from "../part_one/solution.js";

const field = setInputLinesToArray(input)
const tileSymbolReplacer = "$"

function sliceLine(field: string[], lineIndex: number, charToReplace: number) {
  field[lineIndex] = field[lineIndex]!.slice(0, charToReplace) + tileSymbolReplacer + field[lineIndex]!.slice(charToReplace + 1)
}

function setTilesSymbolsOnField(field: string[]): string[] {
  const animalCoordinates = getAnimalCoordinates(field)
  const animalTile: Tile = { ...animalCoordinates, symbol: tileSymbolReplacer }

  let previousTile = animalTile
  let currentTile = getNextToAnimalTile({ field, currentTile: animalTile })
  sliceLine(field, previousTile.y, previousTile.x)
  sliceLine(field, currentTile.y, currentTile.x)

  while (currentTile.symbol !== tileSymbolReplacer) {
    const previousTileMemo = currentTile
    currentTile = getNextTile({ field, previousTile, currentTile })
    previousTile = previousTileMemo
    sliceLine(field, currentTile.y, currentTile.x)
  }

  return field
}

setTilesSymbolsOnField(field)
setNonEnclosedSymbols(field)

function setNonEnclosedSymbols(field: string[]) {
  for (let y = 0; y < field.length; y++) {
    const line = field[y]!

    for (let xLeft = 0; xLeft < line.length; xLeft++) {
      const cell = line[xLeft]!
      sliceLine(field, y, xLeft)

      if (cell === tileSymbolReplacer) {
        break
      }
    }

    for (let xRight = line.length - 1; xRight >= 0; xRight--) {
      const cell = line[xRight]!
      sliceLine(field, y, xRight)

      if (cell === tileSymbolReplacer) {
        break
      }
    }
  }
}