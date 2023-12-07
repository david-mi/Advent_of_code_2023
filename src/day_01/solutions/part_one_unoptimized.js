import { getInputPath, parseInputToArray } from "../../helpers.js";
const calibrationLines = parseInputToArray(getInputPath(import.meta.url, "input"));
/**
 * Non optimized version
 */
function getCalibrationValuesSum(calibrationLines) {
    return calibrationLines.reduce((calibrationValuesSum, calibrationLine) => {
        const firstCharNumber = calibrationLine[[...calibrationLine].findIndex(isCharNumber)];
        const lastCharNumber = calibrationLine[[...calibrationLine].findLastIndex(isCharNumber)];
        return calibrationValuesSum += (parseInt(firstCharNumber + lastCharNumber, 10));
    }, 0);
}
function isCharNumber(char) {
    return /\d/.test(char);
}
export const day01PartOneSolutionUnoptimized = getCalibrationValuesSum(calibrationLines);
