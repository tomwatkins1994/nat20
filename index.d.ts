declare class DiceRoller {
    test: string;
    constructor();
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

export = DiceRoller;
