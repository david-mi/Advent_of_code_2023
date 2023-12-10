import { parseInputToArray } from "../../helpers.js";
import { input } from "./inputs/input.js";
const games = parseInputToArray(input);
const cubesLimit = {
    red: 12,
    green: 13,
    blue: 14
};
function getIdsSum(games) {
    let idsSum = 0;
    gamesLoop: for (const game of games) {
        const gameTries = game.split(";");
        const gameId = getGameId(gameTries[0]);
        for (const gameTurn of gameTries) {
            const cubesBag = new CubesBag();
            const parsedCubeData = parseCubeData(extractCubeData(gameTurn));
            try {
                parsedCubeData.forEach(([amount, color]) => {
                    cubesBag.add(color, amount);
                });
            }
            catch (error) {
                continue gamesLoop;
            }
        }
        idsSum += gameId;
    }
    return idsSum;
}
function getGameId(gameLine) {
    const gameId = gameLine.match(/\d+(?=:)/)[0];
    return parseInt(gameId, 10);
}
export class CubesBag {
    _red = 0;
    _blue = 0;
    _green = 0;
    add(color, amount) {
        this[`_${color}`] += amount;
        if (this[`_${color}`] > cubesLimit[color]) {
            throw new RangeError("Limit reached");
        }
    }
}
export function parseCubeData(cubesData) {
    return cubesData.map((cubeData) => {
        const [amount, color] = cubeData.split(/\s/);
        return [parseInt(amount, 10), color];
    });
}
export function extractCubeData(game) {
    const gameRegex = /(\d+) (blue|red|green)/g;
    return game.match(gameRegex);
}
export const day02PartOneSolution = getIdsSum(games);
