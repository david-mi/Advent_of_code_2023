import { setInputLinesToArray } from "../../helpers.js"
import { input } from "./inputs/input.js"

const engineLines = setInputLinesToArray(input)

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

      if (isDigitCharacter(char)) {
        let numberChar = char
        let nextIndex = x + 1
        let nextChar = engineLine[nextIndex] as string
        const startingX = x

        while (isDigitCharacter(nextChar)) {
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


function getSumOfNumbersWithLinkedCharacter(engineNumbers: EngineNumber[]) {
  return engineNumbers.reduce((sumOfNumbersWithLinkedCharacter, engineNumber) => {
    return getNumberLinkedCharacter({ engineNumber, specialCharacterChecker: isSpecialCharacter, engineLines })
      ? sumOfNumbersWithLinkedCharacter += engineNumber.value
      : sumOfNumbersWithLinkedCharacter
  }, 0)
}

interface getNumberLinkedCharacterProps {
  engineNumber: EngineNumber,
  specialCharacterChecker: (char: string | undefined) => boolean,
  engineLines: string[]
}

export function getNumberLinkedCharacter(props: getNumberLinkedCharacterProps): Coordinates | null {
  const { engineNumber: { startingX, endingX, y }, specialCharacterChecker, engineLines } = props

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
      const isSymbol = specialCharacterChecker(engineLines[y]?.[x])

      if (isSymbol) {
        return { y, x }
      }
    }
  }

  return null
}

function isDigitCharacter(char: string) {
  return /\d/.test(char)
}

function isSpecialCharacter(char?: string) {
  return (
    char !== undefined
    && isDigitCharacter(char) === false
    && char !== "."
  )
}

const engineNumbers = setEngineNumbers(engineLines)

export const day03PartOneSolution = getSumOfNumbersWithLinkedCharacter(engineNumbers)