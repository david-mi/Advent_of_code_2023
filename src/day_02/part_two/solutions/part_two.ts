import { getInputPath, parseInputToArray } from "../../../helpers.js"
import { parseCubeData, extractCubeData, CubesBag } from "../../part_one/solutions/part_one.js"

const games = parseInputToArray(getInputPath(import.meta.url, "input"))
type CubeColor = "red" | "blue" | "green"

function day02PartTwo() {
  const minimalGameCubesAmount = getGamesMinimalCubesAmounts()
  return getGamesCubesPowerSum(minimalGameCubesAmount)
}

function getGamesCubesPowerSum(gamesCubesAmounts: number[][]) {
  return gamesCubesAmounts.reduce((acc, el) => {
    return acc + getGamesCubesPower(el)
  }, 0)
}

function getGamesCubesPower(gamesCubesAmounts: number[]) {
  return gamesCubesAmounts.reduce((cubesPower, cubesAmount) => {
    return cubesPower * cubesAmount
  })
}

function getGamesMinimalCubesAmounts() {
  return games.map(getGameMinimalCubesAmounts)
}

function getGameMinimalCubesAmounts(game: string) {
  const parsedGamesData = parseCubeData(extractCubeData(game))
  const { _blue, _red, _green } = setGameMinimalCubes(parsedGamesData)
  return [_blue, _red, _green]
}

function setGameMinimalCubes(parsedGamesData: [number, CubeColor][]) {
  const cubesBag = new CubesBagMinimal()

  parsedGamesData.forEach(([amount, color]) => {
    cubesBag.set(color, amount)
  })

  return cubesBag
}

class CubesBagMinimal extends CubesBag {
  set(color: CubeColor, amount: number) {
    if (amount > this[`_${color}`]) {
      this[`_${color}`] = amount
    }
  }
}

export const day02PartTwoSolution = day02PartTwo()