import * as math from "mathjs";

import { d } from "./utils/d.js";

export class DiceRoller {
  private rolls: number[];
  private resultText: string;

  constructor() {
    this.rolls = [];
    this.resultText = "";
  }

  /**
   * Performs the dice roll
   * @param rollText defines the dice roll to perform e.g 2d6
   * @param callback defines a callback to perform when the dice roll is completed, passes an object with the result
   * @return a number representing the
   */
  roll(
    rollText: string,
    callback?: (
      result: {
        value: number;
        rolls: number[];
        resultText: string;
      },
      error?: string,
    ) => void,
  ): number {
    try {
      const invalidCharacters = rollText
        .toLowerCase()
        .match(/(?![dD])[A-Za-z]+/g);
      if (invalidCharacters)
        throw new Error(
          `Invalid characters entered: ${invalidCharacters.join(", ")}`,
        );
      const allRolls: number[] = [];
      let resultExpression = rollText;
      let resultDisplayText = rollText;
      const dice =
        rollText.toLowerCase().match(/(?:[0-9]+d)([0-9]+)|(?:d)([0-9]+)/g) ||
        [];
      for (const die of dice) {
        const numRolls =
          Number.parseInt((die.match(/([0-9]+)(?=d)/g) || "").toString()) || 1;
        const maxRoll = Number.parseInt(
          (die.match(/(?<=d)([0-9]+)/g) || "").toString(),
        );
        const rolls = [];
        let total = 0;
        for (let i = 1; i <= numRolls; i++) {
          const result = d(maxRoll);
          total += result;
          rolls.push(result);
          allRolls.push(result);
        }
        resultExpression = resultExpression.replace(die, `(${total})`);
        resultDisplayText = resultDisplayText.replace(
          die,
          `[${rolls.join(",")}]`,
        );
      }
      const diceRollResult = math.evaluate(resultExpression);
      this.rolls = allRolls;
      this.resultText = `${rollText} = ${resultDisplayText} = ${diceRollResult}`;
      if (typeof callback === "function")
        callback({
          value: diceRollResult,
          rolls: allRolls,
          resultText: this.resultText,
        });
      return diceRollResult;
    } catch (error) {
      let errorMessage = "There has been an error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      this.rolls = [];
      this.resultText = `${rollText} - Failed to perform dice roll - ${errorMessage}`;
      if (typeof callback === "function")
        callback({ value: 0, rolls: [], resultText: "" }, errorMessage);
      return 0;
    }
  }

  get getDiceRolls(): number[] {
    return this.rolls;
  }

  get getResultText(): string {
    return this.resultText;
  }
}
