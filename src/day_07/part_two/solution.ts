import { setInputLinesToArray } from "../../helpers.js";
import { input } from "./inputs/input.js";
import { inputExample } from "./inputs/input_example.js";
import { Game } from "../part_one/solution.js";
import { Strengts } from "../part_one/solution.js";

const games = setInputLinesToArray(input)

class GameUpdate extends Game {
  protected getHandStrenght(): number {
    const jokersCardsAmout = this.hand.cardsOccurences.J ?? 0
    const cardsOccurencesInDescendingOrder = this.filterOutJokersFromCardsOccurences(this.orderCardsOccurencesInDescendingOrder())

    if (cardsOccurencesInDescendingOrder[0] !== undefined) {
      cardsOccurencesInDescendingOrder[0]![1] += jokersCardsAmout
    } else {
      cardsOccurencesInDescendingOrder.push(["J", jokersCardsAmout])
    }

    switch (cardsOccurencesInDescendingOrder[0]![1]) {
      case 5: return this.strengths.hand.fiveOfAKind
      case 4: return this.strengths.hand.fourOfAKind
      case 3: return cardsOccurencesInDescendingOrder[1]![1] === 2
        ? this.strengths.hand.fullHouse
        : this.strengths.hand.threeOfAKind
      case 2: return cardsOccurencesInDescendingOrder[1]![1] === 2
        ? this.strengths.hand.twoPair
        : this.strengths.hand.onePair
      default: return this.strengths.hand.highCard
    }
  }

  protected orderCardsOccurencesInDescendingOrder() {
    return Object
      .entries(this.hand.cardsOccurences)
      .sort(([_, nextOccurence], [__, previousOccurence]) => previousOccurence - nextOccurence)
  }

  protected filterOutJokersFromCardsOccurences(cardsOccurencesInDescendingOrder: [string, number][]) {
    return cardsOccurencesInDescendingOrder.filter(([cardOccurenceLabel]) => cardOccurenceLabel !== "J")
  }
}

export const day07PartTwoSolution = games
  .map((gameLine) => new GameUpdate(gameLine, new Strengts({ J: 0 })))
  .sort((nextGame, previousGame) => {
    if (nextGame.hand.strength > previousGame.hand.strength) {
      return 1
    } else if (nextGame.hand.strength < previousGame.hand.strength) {
      return -1
    }

    let cardStrengthIndex = 0
    while (cardStrengthIndex <= 4) {
      if (nextGame.hand.cardsStrength[cardStrengthIndex]! > previousGame.hand.cardsStrength[cardStrengthIndex]!) {
        return 1
      } else if (nextGame.hand.cardsStrength[cardStrengthIndex]! < previousGame.hand.cardsStrength[cardStrengthIndex]!) {
        return -1
      }

      cardStrengthIndex++
    }

    return 0
  })
  .reduce((totalWinnings, game, index) => totalWinnings += game.bid * (index + 1), 0)