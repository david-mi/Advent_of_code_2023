import { setInputLinesToArray } from "../../helpers.js";
import { input } from "./inputs/input.js";

const cardsLine = setInputLinesToArray(input)

export function extractCardNumbers(cardLine: string) {
  const numbersExtractionRegex = /Card\s+\d+:\s+(\d{1,2}.+(?=\s\|)).+((?<=\|\s).+)/
  const matcher = cardLine.match(numbersExtractionRegex)!
  return [matcher[1], matcher[2]] as [string, string]
}

export function setCardNumbersToArray(cardNumbers: string) {
  const spaceRegex = /\s+/
  return cardNumbers.split(spaceRegex)
}

function countCardPoints(scratchedPointsArray: string[], winningPointsSet: Set<string>) {
  return scratchedPointsArray.reduce((winningPoints, scratchedNumber) => {
    if (winningPointsSet.has(scratchedNumber) === false) return winningPoints

    return winningPoints === 0
      ? 1
      : winningPoints * 2
  }, 0)
}

export const day04PartOneSolution = cardsLine.reduce((cardsPoints, cardLine) => {
  const [winningNumbers, scratchedNumbers] = extractCardNumbers(cardLine)
  const scratchedNumbersArray = setCardNumbersToArray(scratchedNumbers)
  const winningNumbersSet = new Set(setCardNumbersToArray(winningNumbers))

  return cardsPoints += countCardPoints(scratchedNumbersArray, winningNumbersSet)
}, 0)