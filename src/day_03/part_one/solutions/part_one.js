import { getInputPath, parseInputToArray } from "../../../helpers.js";
const engineLines = parseInputToArray(getInputPath(import.meta.url, "input"));
export function setEngineNumbers(engineLines) {
    const engineNumbers = [];
    for (let y = 0; y < engineLines.length; y++) {
        const engineLine = engineLines[y];
        for (let x = 0; x < engineLine.length; x++) {
            const char = engineLine[x];
            if (isCharDigit(char)) {
                let numberChar = char;
                let nextIndex = x + 1;
                let nextChar = engineLine[nextIndex];
                const startingX = x;
                while (isCharDigit(nextChar)) {
                    numberChar += nextChar;
                    nextIndex += 1;
                    nextChar = engineLine[nextIndex];
                    x = nextIndex;
                }
                engineNumbers.push({
                    value: parseInt(numberChar, 10),
                    startingX,
                    endingX: nextIndex - 1,
                    y
                });
            }
        }
    }
    return engineNumbers;
}
function getSumOfNumbersWithAdjacentSymbol(engineNumbers) {
    return engineNumbers.reduce((sumOfNumbersWithAdjacentSymbol, engineNumber) => {
        return getNumberAdjacentSymbol(engineNumber, isCharSymbol, engineLines)
            ? sumOfNumbersWithAdjacentSymbol += engineNumber.value
            : sumOfNumbersWithAdjacentSymbol;
    }, 0);
}
export function getNumberAdjacentSymbol({ startingX, endingX, y }, symbolCheckCb, engineLines) {
    for (let x = startingX; x <= endingX; x++) {
        const coordinatesToCheck = [
            { y: y - 1, x: x - 1 },
            { y: y - 1, x: x },
            { y: y - 1, x: x + 1 },
            { y: y, x: x - 1 },
            { y: y, x: x + 1 },
            { y: y + 1, x: x - 1 },
            { y: y + 1, x: x },
            { y: y + 1, x: x + 1 },
        ];
        for (const { x, y } of coordinatesToCheck) {
            const isSymbol = symbolCheckCb(engineLines[y]?.[x]);
            if (isSymbol) {
                return { y, x };
            }
        }
    }
    return null;
}
function isCharDigit(char) {
    return /\d/.test(char);
}
function isCharSymbol(char) {
    return (char !== undefined
        && isCharDigit(char) === false
        && char !== ".");
}
const engineNumbers = setEngineNumbers(engineLines);
export const day03PartOneSolution = getSumOfNumbersWithAdjacentSymbol(engineNumbers);
