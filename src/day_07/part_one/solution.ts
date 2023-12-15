import { setInputLinesToArray } from "../../helpers.js";
import { input } from "./inputs/input.js";
import { inputExample } from "./inputs/input_example.js";

const games = setInputLinesToArray(input)

type Label = "A" | "K" | "Q" | "J" | "T" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";

export class Strengts {
  label = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11,
    "T": 10,
    "9": 8,
    "8": 7,
    "7": 6,
    "6": 5,
    "5": 4,
    "4": 3,
    "3": 2,
    "2": 1
  }
  hand = {
    fiveOfAKind: 7,
    fourOfAKind: 6,
    fullHouse: 5,
    threeOfAKind: 4,
    twoPair: 3,
    onePair: 2,
    highCard: 1
  }

  constructor(labelModifer: { [key in Label]?: number } = {}) {
    for (const label in labelModifer) {
      const value = labelModifer[label as Label]!

      this.label[label as Label] = value
    }
  }
}

export class Game {
  bid = 0
  hand = {
    labels: "",
    strength: 0,
    cardsStrength: [] as number[],
    cardsOccurences: {} as { [key in Label]: number }
  }

  constructor(protected entry: string, protected strengths: Strengts) {
    this.setData()

    for (const label of this.hand.labels) {
      this.setCardsStrenght(label as Label)
      this.setCardOccurence(label as Label)
    }

    this.hand.strength = this.getHandStrenght()
  }

  protected setData() {
    const dataRegex = /(.+)\s(\d+$)/
    const [_, hand, bid] = this.entry.match(dataRegex) as [string, string, string]
    this.bid = parseInt(bid, 10)
    this.hand.labels = hand
  }

  protected setCardsStrenght(label: Label) {
    this.hand.cardsStrength.push(this.strengths.label[label])
  }

  protected setCardOccurence(label: Label) {
    if (this.hand.cardsOccurences[label]) {
      this.hand.cardsOccurences[label]++
    } else {
      this.hand.cardsOccurences[label] = 1
    }
  }

  protected getHandStrenght(): number {
    const cardsOccurencesInDescendingOrder = this.orderCardsOccurencesInDescendingOrder()

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
}

export const day07PartOneSolution = games
  .map((gameLine) => new Game(gameLine, new Strengts()))
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