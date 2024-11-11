# Nat20

A simple library for simulating dice rolls for use in RPG games :)

## Installation

Using npm

```bash
npm install nat20
```

## Usage

```ts
import { DiceRoller, d } from "nat20";

const diceRoller = new DiceRoller();

diceRoller.roll("2d6"); // Should return a number between 2 and 12

diceRoller.roll("2a6"); // Should throw an erro due to this being an invalid expression

// Alternatively, you can use a callback
diceRoller.roll("d6 + 6", (result, error) => {
    // The result should be a number between 7 anad 12
    // Tf the expression is invalid, you can access the error message here instead of it being thrown
});

// You can also simply roll a single dice, taking the number of sides as a parameter
const result = d(20) // Should return a number between 1 and 20
```