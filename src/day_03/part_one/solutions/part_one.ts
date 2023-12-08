import { getInputPath, parseInputToArray } from "../../../helpers.js"

const engineLines = parseInputToArray(getInputPath(import.meta.url, "input"))

export interface EngineNumber {
  value: number
  startingX: number,
  endingX: number,
  y: number
}

export interface Coordinates {
  y: number
  x: number
}

export function setEngineNumbers(engineLines: string[]) {
  const engineNumbers: EngineNumber[] = []

  for (let y = 0; y < engineLines.length; y++) {
    const engineLine = engineLines[y]!

    for (let x = 0; x < engineLine.length; x++) {
      const char = engineLine[x]!

      if (isCharDigit(char)) {
        let numberChar = char
        let nextIndex = x + 1
        let nextChar = engineLine[nextIndex] as string
        const startingX = x

        while (isCharDigit(nextChar)) {
          numberChar += nextChar
          nextIndex += 1
          nextChar = engineLine[nextIndex] as string
          x = nextIndex
        }

        engineNumbers.push({
          value: parseInt(numberChar, 10),
          startingX,
          endingX: nextIndex - 1,
          y
        })
      }
    }
  }

  return engineNumbers
}


function getSumOfNumbersWithAdjacentSymbol(engineNumbers: EngineNumber[]) {
  return engineNumbers.reduce((sumOfNumbersWithAdjacentSymbol, engineNumber) => {
    return getNumberAdjacentSymbol(engineNumber, isCharSymbol, engineLines)
      ? sumOfNumbersWithAdjacentSymbol += engineNumber.value
      : sumOfNumbersWithAdjacentSymbol
  }, 0)
}

export function getNumberAdjacentSymbol(
  { startingX, endingX, y }: EngineNumber,
  symbolCheckCb: (char: string | undefined) => boolean,
  engineLines: string[]
): Coordinates | null {

  for (let x = startingX; x <= endingX; x++) {
    const coordinatesToCheck: Coordinates[] = [
      { y: y - 1, x: x - 1 },
      { y: y - 1, x: x },
      { y: y - 1, x: x + 1 },
      { y: y, x: x - 1 },
      { y: y, x: x + 1 },
      { y: y + 1, x: x - 1 },
      { y: y + 1, x: x },
      { y: y + 1, x: x + 1 },
    ]

    for (const { x, y } of coordinatesToCheck) {
      const isSymbol = symbolCheckCb(engineLines[y]?.[x])

      if (isSymbol) {
        return { y, x }
      }
    }
  }

  return null
}

function isCharDigit(char: string) {
  return /\d/.test(char)
}

function isCharSymbol(char?: string) {
  return (
    char !== undefined
    && isCharDigit(char) === false
    && char !== "."
  )
}

const engineNumbers = setEngineNumbers(engineLines)

export const day03PartOneSolution = getSumOfNumbersWithAdjacentSymbol(engineNumbers)