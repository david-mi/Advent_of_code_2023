import { expect, test, describe } from "vitest";
import { day01PartOneSolution } from "./day_01/part_one/solution.js";
import { day01PartTwoSolution } from "./day_01/part_two/solution.js";
import { day02PartOneSolution } from "./day_02/part_one/solution.js";
import { day02PartTwoSolution } from "./day_02/part_two/solution.js";
import { day03PartOneSolution } from "./day_03/part_one/solution.js";
import { day03PartTwoSolution } from "./day_03/part_two/solution.js";
import { day04PartOneSolution } from "./day_04/part_one/solution.js";
import { day04PartTwoSolution } from "./day_04/part_two/solution.js";
import { day06PartOneSolution } from "./day_06/part_one/solution.js";
import { day06PartTwoSolution } from "./day_06/part_two/solution.js";
import { day07PartOneSolution } from "./day_07/part_one/solution.js";
import { day07PartTwoSolution } from "./day_07/part_two/solution.js";
import { day08PartOneSolution } from "./day_08/part_one/solution.js";
import { day09PartOneSolution } from "./day_09/part_one/solution.js";
import { day09PartTwoSolution } from "./day_09/part_two/solution.js";
import { day10PartOneSolution } from "./day_10/part_one/solution.js";
import { day14PartOneSolution } from "./day_14/part_one/solution.js";
import { day14PartTwoSolution } from "./day_14/part_two/solution.js";
import { day15PartOneSolution } from "./day_15/part_one/solution.js";
import { day15PartTwoSolution } from "./day_15/part_two/solution.js";
import { day16PartOneSolution } from "./day_16/part_one/solution.js";
import { day16PartTwoSolution } from "./day_16/part_two/solution.js";

describe("Day 01", () => {
  test("Part one", () => {
    expect(day01PartOneSolution).toBe(54634)
  })
  test("Part two", () => {
    expect(day01PartTwoSolution).toBe(53855)
  })
})

describe("Day 02", () => {
  test("Part one", () => {
    expect(day02PartOneSolution).toBe(2237)
  })
  test("Part two", () => {
    expect(day02PartTwoSolution).toBe(66681)
  })
})

describe("Day 03", () => {
  test("Part one", () => {
    expect(day03PartOneSolution).toBe(527364)
  })
  test("Part two", () => {
    expect(day03PartTwoSolution).toBe(79026871)
  })
})

// DAY 05 MISSING

describe("Day 04", () => {
  test("Part one", () => {
    expect(day04PartOneSolution).toBe(21158)
  })
  test("Part two", () => {
    expect(day04PartTwoSolution).toBe(6050769)
  })
})

describe("Day 06", () => {
  test("Part one", () => {
    expect(day06PartOneSolution).toBe(114400)
  })
  test("Part two", () => {
    expect(day06PartTwoSolution).toBe(21039729)
  })
})

describe("Day 07", () => {
  test("Part one", () => {
    expect(day07PartOneSolution).toBe(251136060)
  })
  test("Part two", () => {
    expect(day07PartTwoSolution).toBe(249400220)
  })
})

describe("Day 08", () => {
  test("Part one", () => {
    expect(day08PartOneSolution).toBe(13301)
  })

  // PART TWO MISSING
})

describe("Day 09", () => {
  test("Part one", () => {
    expect(day09PartOneSolution).toBe(1938731307)
  })
  test("Part two", () => {
    expect(day09PartTwoSolution).toBe(948)
  })
})

describe("Day 10", () => {
  test("Part one", () => {
    expect(day10PartOneSolution).toBe(7066)
  })

  // PART TWO MISSING
})

// DAY 11, 12, 13 MISSING

describe("Day 14", () => {
  test("Part one", () => {
    expect(day14PartOneSolution).toBe(105461)
  })

  test("Part two", () => {
    expect(day14PartTwoSolution).toBe(102829)
  })
})

describe("Day 15", () => {
  test("Part one", () => {
    expect(day15PartOneSolution).toBe(510273)
  })

  test("Part two", () => {
    expect(day15PartTwoSolution).toBe(212449)
  })
})

describe("Day 16", () => {
  test("Part one", () => {
    expect(day16PartOneSolution).toBe(7951)
  })

  test("Part two", () => {
    expect(day16PartTwoSolution).toBe(8148)
  })
})
