import { getInputPath, parseInputToArray } from "../../../helpers.js";
const engineLines = parseInputToArray(getInputPath(import.meta.url, "input"));
export function setEngineNumbers(engineLines) {
    const engineNumbers = [];
    for (let y = 0; y < engineLines.length; y++) {
        const engineLine = engineLines[y];
        for (let x = 0; x < engineLine.length; x++) {
            const char = engineLine[x];
            if (isDigitCharacter(char)) {
                let numberChar = char;
                let nextIndex = x + 1;
                let nextChar = engineLine[nextIndex];
                const startingX = x;
                while (isDigitCharacter(nextChar)) {
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
function getSumOfNumbersWithLinkedCharacter(engineNumbers) {
    return engineNumbers.reduce((sumOfNumbersWithLinkedCharacter, engineNumber) => {
        return getNumberLinkedCharacter({ engineNumber, specialCharacterChecker: isSpecialCharacter, engineLines })
            ? sumOfNumbersWithLinkedCharacter += engineNumber.value
            : sumOfNumbersWithLinkedCharacter;
    }, 0);
}
export function getNumberLinkedCharacter(props) {
    const { engineNumber: { startingX, endingX, y }, specialCharacterChecker, engineLines } = props;
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
            const isSymbol = specialCharacterChecker(engineLines[y]?.[x]);
            if (isSymbol) {
                return { y, x };
            }
        }
    }
    return null;
}
function isDigitCharacter(char) {
    return /\d/.test(char);
}
function isSpecialCharacter(char) {
    return (char !== undefined
        && isDigitCharacter(char) === false
        && char !== ".");
}
const engineNumbers = setEngineNumbers(engineLines);
export const day03PartOneSolution = getSumOfNumbersWithLinkedCharacter(engineNumbers);
