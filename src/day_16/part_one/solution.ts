import { setInputLinesToArray } from "../../helpers.js";
import { inputExample } from "./inputs/input_example.js";
import { input } from "./inputs/input.js";
import { type Tile, type BeamParameters, type Coordinates, Direction, type TileSymbol } from "../types.js";

const inputLine = setInputLinesToArray(input)!

/**
 * Makes debugging visibility easier to replace "." with "·"
 */

export function formatInputLine(inputLine: string[]) {
  return inputLine.map(line => line.replaceAll(".", "·"))
}

export class Contraption {
  tiles = new Map<string, Tile>()
  energizedTilesCount = 0
  private _grid: TileSymbol[][]

  constructor(inputLine: string[]) {
    this.setTiles(inputLine)
    this._grid = this.setGrid(inputLine)
  }

  getTileOrNull({ y, x }: Coordinates): Tile | null {
    return this.tiles.get(`${y}-${x}`) ?? null
  }

  setTileEnergized({ y, x }: Coordinates): void {
    const tile = this.tiles.get(`${y}-${x}`)!
    if (tile.energized) return

    this.tiles.set(`${y}-${x}`, {
      energized: true,
      symbol: tile.symbol,
      coordinates: { x, y }
    })

    this.energizedTilesCount++
    this._grid[y]![x]! = "$" as TileSymbol
  }

  private setTiles(inputLine: string[]) {
    for (let y = 0; y < inputLine.length; y++) {
      for (let x = 0; x < inputLine[y]!.length; x++) {
        this.tiles.set(`${y}-${x}`, {
          energized: false,
          symbol: inputLine[y]![x] as TileSymbol,
          coordinates: { x, y }
        })
      }
    }
  }

  get grid() {
    return this._grid.map(row => row.join(""))
  }

  setGrid(inputLine: string[]) {
    return inputLine.map((inputLine) => {
      return Array.from(inputLine) as TileSymbol[]
    })
  }
}

export class Beam {
  x: number
  y: number
  direction: Direction
  isMoving = true

  constructor(parameters: BeamParameters, public contraption: Contraption) {
    this.x = parameters.x
    this.y = parameters.y
    this.direction = parameters.direction
    this.contraption.setTileEnergized({ x: this.x, y: this.y })
    this.move()
  }

  private setDirection() {
    const currentTileSymbol = this.contraption.getTileOrNull(this)!.symbol

    switch (currentTileSymbol) {
      case "-": {
        if (this.direction === Direction.UP || this.direction === Direction.DOWN) {
          this.direction = Direction.RIGHT
          new Beam(
            {
              direction: Direction.LEFT,
              x: this.x,
              y: this.y
            },
            this.contraption)
        }
        break
      }
      case "|": {
        if (this.direction === Direction.LEFT || this.direction === Direction.RIGHT) {
          this.direction = Direction.DOWN
          new Beam(
            {
              direction: Direction.UP,
              x: this.x,
              y: this.y
            },
            this.contraption)
        }
        break
      }
      case "/": {
        switch (this.direction) {
          case Direction.UP: return this.direction = Direction.RIGHT
          case Direction.DOWN: return this.direction = Direction.LEFT
          case Direction.LEFT: return this.direction = Direction.DOWN
          case Direction.RIGHT: return this.direction = Direction.UP
        }
      }
      case "\\": {
        switch (this.direction) {
          case Direction.UP: return this.direction = Direction.LEFT
          case Direction.DOWN: return this.direction = Direction.RIGHT
          case Direction.LEFT: return this.direction = Direction.UP
          case Direction.RIGHT: return this.direction = Direction.DOWN
        }
      }
    }
  }

  private getNextTile(): Tile | null {
    switch (this.direction) {
      case Direction.RIGHT: return this.contraption.getTileOrNull({ x: this.x + 1, y: this.y })
      case Direction.LEFT: return this.contraption.getTileOrNull({ x: this.x - 1, y: this.y })
      case Direction.DOWN: return this.contraption.getTileOrNull({ x: this.x, y: this.y + 1 })
      case Direction.UP: return this.contraption.getTileOrNull({ x: this.x, y: this.y - 1 })
    }
  }

  private setCoordinates({ x, y }: Coordinates) {
    this.x = x
    this.y = y
  }

  private isEnteringEnergyLoop(tile: Tile) {
    const isDirectionVertical = this.isDirectionVertical()

    return tile.energized &&
      (
        tile.symbol === "-" && isDirectionVertical ||
        tile.symbol === "|" && isDirectionVertical === false
      )
  }

  private isDirectionVertical() {
    return this.direction === Direction.UP || this.direction === Direction.DOWN
  }

  private move() {
    while (this.isMoving) {
      this.setDirection()
      const nextTile = this.getNextTile()
      if (nextTile === null || this.isEnteringEnergyLoop(nextTile)) {
        return this.isMoving = false
      }
      this.setCoordinates(nextTile.coordinates)
      this.contraption.setTileEnergized(nextTile.coordinates)
    }
  }
}

const contraption = new Contraption(formatInputLine(inputLine))
new Beam(
  {
    direction: Direction.RIGHT,
    x: 0,
    y: 0
  },
  contraption)

export const day16PartOneSolution = contraption.energizedTilesCount
