import { setInputLinesToArray } from "../../helpers.js";
import { extractCardNumbers, setCardNumbersToArray } from "../part_one/solution.js";
import { input } from "./inputs/input.js";

const cardsLine = setInputLinesToArray(input)

interface CountCardsProps {
  currentGameId: number
  scratchedNumbersArray: string[],
  winningNumbersSet: Set<string>,
  gamesCount: { [gameIndex: string]: number }
}

function getGameScratchcards(props: CountCardsProps) {
  const { currentGameId, scratchedNumbersArray, winningNumbersSet, gamesCount } = props
  let gameIdMultiplier = 1

  for (let i = 0; i < scratchedNumbersArray.length; i++) {
    const scratchedNumber = scratchedNumbersArray[i]!
    if (winningNumbersSet.has(scratchedNumber) === false) continue

    const gameToIncrement = currentGameId + gameIdMultiplier

    gamesCount[gameToIncrement] += gamesCount[currentGameId]!

    gameIdMultiplier++
  }

  return gamesCount[currentGameId]!
}

function initializeGamesCount(cardsLine: string[]) {
  return cardsLine.reduce<{ [gameIndex: string]: number }>((gamesCount, _, index) => {
    gamesCount[index + 1] = 1
    return gamesCount
  }, {})
}

export const day04PartTwoSolution = (function () {
  const gamesCount = initializeGamesCount(cardsLine)
  return cardsLine.reduce((gamesScratchcards, cardLine, gameIndex) => {
    const [winningNumbers, scratchedNumbers] = extractCardNumbers(cardLine)
    const scratchedNumbersArray = setCardNumbersToArray(scratchedNumbers)
    const winningNumbersSet = new Set(setCardNumbersToArray(winningNumbers))
    const gameCount = getGameScratchcards({
      currentGameId: gameIndex + 1,
      winningNumbersSet,
      scratchedNumbersArray,
      gamesCount
    })

    return gamesScratchcards += gameCount
  }, 0)
})()