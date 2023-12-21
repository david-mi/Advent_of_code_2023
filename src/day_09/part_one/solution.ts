import { setInputLinesToArray } from "../../helpers.js";
import { inputExample } from "./inputs/input_example.js";
import { input } from "./inputs/input.js";

export const inputLines = setInputLinesToArray(input)
const dataset = inputLines.map(getHistory)

export function getHistory(inputLine: string) {
  return inputLine
    .split(/\s+/)
    .map(Number)
}

export function getHistoriesValuesSum(dataset: number[][], getHistoryValueCallback: (sequences: number[][]) => number) {
  return dataset.reduce((historiesValuesSum, history) => {
    const sequences = getSequences([history])
    return historiesValuesSum += getHistoryValueCallback(sequences)
  }, 0)
}

export function getSequences(sequences: number[][]): number[][] {
  const nextSequence: number[] = []
  let zeroStepsCount = 0
  const currentSequence = sequences[0]!

  for (let i = 0; i < currentSequence.length - 1; i++) {
    const step = currentSequence[i + 1]! - currentSequence[i]!

    if (step === 0) {
      zeroStepsCount++
    }

    nextSequence.push(step)
  }

  sequences.unshift(nextSequence)

  if (zeroStepsCount === nextSequence.length) {
    return sequences
  }

  return getSequences(sequences)
}

function getHistoryNextValue(sequences: number[][]) {
  let result = 0

  for (let i = 0; i < sequences.length; i++) {
    const currentSequence = sequences[i]!
    const sequenceLastNumber = currentSequence.at(-1)!
    result += sequenceLastNumber
  }

  return result
}

const historiesValuesSum = getHistoriesValuesSum(dataset, getHistoryNextValue)
export const day09PartOneSolution = historiesValuesSum