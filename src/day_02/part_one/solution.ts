import { setInputLinesToArray } from "../../helpers.js"
import { input } from "./inputs/input.js"

const games = setInputLinesToArray(input)

const cubesLimit = {
  red: 12,
  green: 13,
  blue: 14
}

type CubeColor = "red" | "blue" | "green"

function getIdsSum(games: string[]) {
  let idsSum = 0

  gamesLoop: for (const game of games) {
    const gameTries = game.split(";")
    const gameId = getGameId(gameTries[0]!)

    for (const gameTurn of gameTries) {
      const cubesBag = new CubesBag()
      const parsedCubeData = parseCubeData(extractCubeData(gameTurn))

      try {
        parsedCubeData.forEach(([amount, color]) => {
          cubesBag.add(color, amount)
        })
      } catch (error) {
        continue gamesLoop
      }
    }

    idsSum += gameId
  }

  return idsSum
}


function getGameId(gameLine: string) {
  const gameId = gameLine!.match(/\d+(?=:)/)![0]
  return parseInt(gameId, 10)
}

export class CubesBag {
  _red = 0
  _blue = 0
  _green = 0

  add(color: CubeColor, amount: number) {
    this[`_${color}`] += amount
    if (this[`_${color}`] > cubesLimit[color]) {
      throw new RangeError("Limit reached")
    }
  }
}

export function parseCubeData(cubesData: RegExpMatchArray): [number, CubeColor][] {
  return cubesData.map((cubeData) => {
    const [amount, color] = cubeData.split(/\s/) as [string, CubeColor]
    return [parseInt(amount, 10), color]
  })
}

export function extractCubeData(game: string) {
  const gameRegex = /(\d+) (blue|red|green)/g
  return game.match(gameRegex)!
}

export const day02PartOneSolution = getIdsSum(games)