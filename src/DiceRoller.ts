import d from './utils/d';

interface DiceRoller {
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
    ): number;
    getDiceRolls(): number[];
    getResultText(): string;
}

class DiceRoller {
    constructor() {
        // Private props
        let rolls = [];
        let resultText = null;

        this.roll = (rollText, callback) => {
            try {
                rollText = rollText.toLowerCase();
                let invalidCharactes = rollText.match(/(?![dD])[A-Za-z]+/g);
                if (invalidCharactes)
                    throw new Error(
                        `Invalid characters entered: ${invalidCharactes.join(
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
                const diceRollResult = eval(resultExpression);
                rolls = allRolls;
                resultText = `${rollText} = ${resultDisplayText} = ${diceRollResult}`;
                if (typeof callback === 'function')
                    callback({
                        value: diceRollResult,
                        rolls: allRolls,
                        resultText: resultDisplayText,
                    });
                return diceRollResult;
            } catch (err) {
                rolls = [];
                resultText = `${rollText} - Failed to perform dice roll - ${err}`;
                if (typeof callback === 'function')
                    callback({ value: 0, rolls: [], resultText: null }, err);
                return 0;
            }
        };

        this.getDiceRolls = () => {
            return rolls;
        };

        this.getResultText = () => {
            return resultText;
        };
    }
}

export default DiceRoller;
