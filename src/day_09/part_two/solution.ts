import { setInputLinesToArray } from "../../helpers.js";
import { inputExample } from "./inputs/input_example.js";
import { input } from "./inputs/input.js";
import { getHistory, getHistoriesValuesSum } from "../part_one/solution.js";

export const inputLines = setInputLinesToArray(input)
const dataset = inputLines.map(getHistory)

function getHistorPreviousValue(sequences: number[][]) {
  let result = 0

  for (let i = 0; i < sequences.length - 1; i++) {
    const currentSequence = sequences[i]!
    const sequenceFirstNumber = currentSequence[0]!

    const nextSequence = sequences[i + 1]!
    const nextSequenceFirstNumber = nextSequence[0]!

    result = nextSequenceFirstNumber - sequenceFirstNumber
    sequences[i + 1]!.unshift(result)
  }

  return result
}

const historiesValuesSum = getHistoriesValuesSum(dataset, getHistorPreviousValue)
export const day09PartTwoSolution = historiesValuesSum