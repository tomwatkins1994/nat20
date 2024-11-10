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
const result = diceRoller.roll("2d6"); // Should return a number between 2 and 12

// Or, simply roll a single d20
const result = d(20) // Should return a number between 1 and 20
```