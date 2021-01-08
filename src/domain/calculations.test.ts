import { parsePlants, byName } from "./plant";

import { contributions } from './calculations';

const data = require('./plants.json')

const plants = parsePlants(data).unsafeCoerce();
const plantsByName = byName(plants)

test('it adds quantities of plants correctly', () => {
    const inventory = Object.fromEntries([
        ["Carrot", 1],
        ["Corn", 2]
    ]);

    const result = contributions(plantsByName, inventory);

    expect(result).toEqual({
        formula: 0,
        compost: -6,
        manure: 6,
        water: 2.25
    })
});