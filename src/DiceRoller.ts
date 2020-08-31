import d from './utils/d';
import * as math from 'mathjs';

class DiceRoller {
    private rolls: number[];
    private resultText: string;

    constructor() {
        this.rolls = [];
        this.resultText = null;
    }

    roll(
        rollText: string,
        callback?: (
            result: {
                value: number;
                rolls: number[];
                resultText: string;
            },
            error?: string,
        ) => any,
    ) {
        try {
            rollText = rollText.toLowerCase();
            let invalidCharacters = rollText.match(/(?![dD])[A-Za-z]+/g);
            if (invalidCharacters)
                throw new Error(
                    `Invalid characters entered: ${invalidCharacters.join(
                        ', ',
                    )}`,
                );
            let allRolls = [];
            let resultExpression = rollText;
            let resultDisplayText = rollText;
            rollText
                .match(/(?:[0-9]+d)([0-9]+)|(?:d)([0-9]+)/g)
                .forEach(die => {
                    let numRolls =
                        parseInt(
                            (die.match(/([0-9]+)(?=d)/g) || '').toString(),
                        ) || 1;
                    let maxRoll = parseInt(
                        (die.match(/(?<=d)([0-9]+)/g) || '').toString(),
                    );
                    let rolls = [];
                    let total = 0;
                    for (let i = 1; i <= numRolls; i++) {
                        let result = d(maxRoll);
                        total += result;
                        rolls.push(result);
                        allRolls.push(result);
                    }
                    resultExpression = resultExpression.replace(
                        die,
                        `(${total})`,
                    );
                    resultDisplayText = resultDisplayText.replace(
                        die,
                        `[${rolls.join(',')}]`,
                    );
                });
            const diceRollResult = math.evaluate(resultExpression);
            this.rolls = allRolls;
            this.resultText = `${rollText} = ${resultDisplayText} = ${diceRollResult}`;
            if (typeof callback === 'function')
                callback({
                    value: diceRollResult,
                    rolls: allRolls,
                    resultText: this.resultText,
                });
            return diceRollResult;
        } catch (err) {
            this.rolls = [];
            this.resultText = `${rollText} - Failed to perform dice roll - ${err}`;
            if (typeof callback === 'function')
                callback({ value: 0, rolls: [], resultText: null }, err);
            return 0;
        }
    }

    getDiceRolls() {
        return this.rolls;
    }

    getResultText() {
        return this.resultText;
    }
}

export default DiceRoller;
