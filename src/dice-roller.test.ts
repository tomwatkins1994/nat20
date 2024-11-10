import { describe, expect, test } from "vitest"

import { DiceRoller } from "./dice-roller.js"

describe("DiceRoller = Simple Tests", function () {
    const diceRoller = new DiceRoller()
    test(`2d6 - Result should be between 2 and 12`, function () {
        diceRoller.roll("2d6", (result, error) => {
            expect(error).toBeUndefined()
            expect(result.value).to.be.gte(2).and.lte(12)
        })
    })
    test(`3d6 - Result should be between 3 and 18`, function () {
        diceRoller.roll("3d6", (result, error) => {
            expect(error).toBeUndefined()
            expect(result.value).to.be.gte(3).and.lte(18)
        })
    })
    test(`2d6+10 - Result should be between 12 and 22`, function () {
        diceRoller.roll("2d6+10", (result, error) => {
            expect(error).toBeUndefined()
            expect(result.value).to.be.gte(12).and.lte(22)
        })
    })
    test(`3d6+10 - Result should be between 13 and 28`, function () {
        diceRoller.roll("3d6+10", (result, error) => {
            expect(error).toBeUndefined()
            expect(result.value).to.be.gte(13).and.lte(28)
        })
    })
    test(`2d6+d10 - Result should be between 3 and 22`, function () {
        diceRoller.roll("2d6+d10", (result, error) => {
            expect(error).toBeUndefined()
            expect(result.value).to.be.gte(3).and.lte(22)
        })
    })
    test(`3D6+d10 - Result should be between 4 and 28`, function () {
        diceRoller.roll("3d6+d10", (result, error) => {
            expect(error).toBeUndefined()
            expect(result.value).to.be.gte(4).and.lte(28)
        })
    })
})

describe("DiceRoller - Error Handling", function () {
    const diceRoller = new DiceRoller()
    test(`2x6 - Result should be an error due to invalid character`, function () {
        diceRoller.roll("2x6", (_, error) => {
            expect(error).toBeDefined()
            expect(error).length.is.greaterThan(0)
        })
    })
})
