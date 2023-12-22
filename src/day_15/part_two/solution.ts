import { setInputLinesToArray } from "../../helpers.js";
import { inputExample } from "./inputs/input_example.js";
import { input } from "./inputs/input.js";
import { splitLineIntoSteps, getStepValue } from "../part_one/solution.js";

type Operation = "-" | "="

type Box = Map<string, number>
type Boxes = Map<number, Box>

const inputLine = setInputLinesToArray(input)[0]!
const steps = splitLineIntoSteps(inputLine)
const boxes = makeBoxes(steps)
const focusingPower = getFocusingPower(Array.from(boxes))

function getFocusingPower(boxes: [number, Box][]) {
  return boxes.reduce((focusingPower, [boxNumber, box]) => {
    return focusingPower += Array
      .from(box)
      .reduce((total, [_, lensStrengthNumber], index) => {
        const boxCount = boxNumber + 1
        const slotNumber = index + 1
        return total += boxCount * slotNumber * lensStrengthNumber
      }, 0)
  }, 0)
}

function makeBoxes(steps: string[]): Boxes {
  const boxes: Boxes = new Map()

  for (const step of steps) {
    const { label, operation, lensStrength } = getStepInfos(step)
    const boxNumber = getStepValue(label)
    const box = boxes.get(boxNumber)

    if (operation === "=") {
      const lensStrengthNumber = parseInt(lensStrength as string, 10)

      if (box) {
        box.set(label, lensStrengthNumber)
        continue
      }

      const lenses = new Map()
      lenses.set(label, lensStrengthNumber)
      boxes.set(boxNumber, lenses)
    }
    else {
      if (!box) continue

      box.delete(label)

      if (box.size === 0) {
        boxes.delete(boxNumber)
      }
    }
  }

  return boxes
}

function getStepInfos(step: string) {
  const labelRegex = /([a-z]+)(=|-)(\d+)?/
  const match = step.match(labelRegex) as [string, string, Operation, string?]

  return {
    label: match[1],
    operation: match[2],
    lensStrength: match[3]
  }
}

export const day15PartTwoSolution = focusingPower
