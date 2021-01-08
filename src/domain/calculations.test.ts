import { parsePlants, byName } from "./plant";

const { contributions } = require('./calculations')

const data = require('./plants.json')

const plants = parsePlants(data).unsafeCoerce();
const byName = byName(plants)

test('it work', () => {
    const inventory = Object.fromEntries([
        ["Carrot", 1],
        ["Corn", 2]
    ]);

    const result = contributions(byName, inventory);

    expect(result).toEqual({
        formula: 0,
        compost: -6,
        manure: 6,
        water: 2.25
    })
});