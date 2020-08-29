import d from '../src/utils/d';
import DiceRoller from '../src/DiceRoller';
import { expect } from 'chai';
import 'mocha';
import addContext from 'mochawesome/addContext';

describe('Basic Dice Range Tests', function () {
    for (let i = 1; i <= 100; i++) {
        const roll = d(i);
        it(`d${i} - Result should be between 1 and ${i}`, function () {
            addContext(this, `Rolled a ${roll}`);
            expect(roll).to.be.gte(1).and.lte(i);
        });
    }
});

describe('DiceRoller = Simple Tests', function () {
    const diceRoller = new DiceRoller();
    it(`2d6 - Result should be between 2 and 12`, function () {
        let result = diceRoller.roll('2d6');
        addContext(this, diceRoller.getResultText());
        expect(result).to.be.gte(2).and.lte(12);
    });
    it(`3d6 - Result should be between 3 and 18`, function () {
        let result = diceRoller.roll('3d6');
        addContext(this, diceRoller.getResultText());
        expect(result).to.be.gte(3).and.lte(18);
    });
    it(`2d6+10 - Result should be between 12 and 22`, function () {
        let result = diceRoller.roll('2d6+10');
        addContext(this, diceRoller.getResultText());
        expect(result).to.be.gte(12).and.lte(22);
    });
    it(`3d6+10 - Result should be between 13 and 28`, function () {
        let result = diceRoller.roll('3d6+10');
        addContext(this, diceRoller.getResultText());
        expect(result).to.be.gte(13).and.lte(28);
    });
    it(`2d6+d10 - Result should be between 3 and 22`, function () {
        let result = diceRoller.roll('2d6+d10');
        addContext(this, diceRoller.getResultText());
        expect(result).to.be.gte(3).and.lte(22);
    });
    it(`3D6+d10 - Result should be between 4 and 28`, function () {
        let result = diceRoller.roll('3D6+d10');
        addContext(this, diceRoller.getResultText());
        expect(result).to.be.gte(4).and.lte(28);
    });
});

describe('DiceRoller - Error Handling', function () {
    const diceRoller = new DiceRoller();
    it(`2x6 - Result should be an error due to invalid character`, function () {
        let result = diceRoller.roll('2x6');
        addContext(this, diceRoller.getResultText());
        expect(result).to.be.equal(0);
    });
});
