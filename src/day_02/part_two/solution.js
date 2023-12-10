import { parseInputToArray } from "../../helpers.js";
import { parseCubeData, extractCubeData, CubesBag } from "../part_one/solution.js";
import { input } from "./inputs/input.js";
const games = parseInputToArray(input);
function day02PartTwo() {
    const minimalGameCubesAmount = getGamesMinimalCubesAmounts();
    return getGamesCubesPowerSum(minimalGameCubesAmount);
}
function getGamesCubesPowerSum(gamesCubesAmounts) {
    return gamesCubesAmounts.reduce((acc, el) => {
        return acc + getGamesCubesPower(el);
    }, 0);
}
function getGamesCubesPower(gamesCubesAmounts) {
    return gamesCubesAmounts.reduce((cubesPower, cubesAmount) => {
        return cubesPower * cubesAmount;
    });
}
function getGamesMinimalCubesAmounts() {
    return games.map(getGameMinimalCubesAmounts);
}
function getGameMinimalCubesAmounts(game) {
    const parsedGamesData = parseCubeData(extractCubeData(game));
    const { _blue, _red, _green } = setGameMinimalCubes(parsedGamesData);
    return [_blue, _red, _green];
}
function setGameMinimalCubes(parsedGamesData) {
    const cubesBag = new CubesBagMinimal();
    parsedGamesData.forEach(([amount, color]) => {
        cubesBag.set(color, amount);
    });
    return cubesBag;
}
class CubesBagMinimal extends CubesBag {
    set(color, amount) {
        if (amount > this[`_${color}`]) {
            this[`_${color}`] = amount;
        }
    }
}
export const day02PartTwoSolution = day02PartTwo();
