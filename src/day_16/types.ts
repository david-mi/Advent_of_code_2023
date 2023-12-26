export interface Coordinates {
  x: number,
  y: number
}

export enum Direction {
  RIGHT = "right",
  LEFT = "left",
  UP = "up",
  DOWN = "down"
}

export type TileSymbol = "·" | "|" | "-" | "/" | "\\"

export interface Tile {
  energized: boolean
  symbol: TileSymbol
  coordinates: Coordinates
}

export type BeamParameters = Coordinates & { direction: Direction }