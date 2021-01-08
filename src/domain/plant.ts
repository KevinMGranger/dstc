import { Either } from 'purify-ts'
import { array, Codec, enumeration, GetType, number, string } from 'purify-ts/Codec'

enum Season {
    Fall = "fall",
    Winter = "winter",
    Spring = "spring",
    Summer = "summer"
}

export interface Nutrients {
    formula: number
    compost: number
    manure: number
    water: number
}

export function zeroNutrients(): Nutrients {
    return {
        formula: 0,
        compost: 0,
        manure: 0,
        water: 0.0
    }
}

export function addNutrients(lhs: Nutrients, rhs: Nutrients): Nutrients {
    return {
        formula: lhs.formula + rhs.formula,
        compost: lhs.compost + rhs.compost,
        manure: lhs.manure + rhs.manure,
        water: lhs.water + rhs.water
    }
}

export function mulNutrients(lhs: Nutrients, rhs: number): Nutrients {
    return {
        formula: lhs.formula * rhs,
        compost: lhs.compost * rhs,
        manure: lhs.manure * rhs,
        water: lhs.water * rhs
    }
}

const plantCodec = Codec.interface({
    name: string,
    seed: string,
    seasons: array(enumeration(Season)),
    formula: number,
    compost: number,
    manure: number,
    water: number
})

export type Plant = GetType<typeof plantCodec>;

export function parsePlants(data: any): Either<string, Plant[]> {
    return array(plantCodec).decode(data)
}

export function byName(plants: Plant[]): Record<string, Plant> {
    return Object.fromEntries(plants.map(val => [val.name, val]))
}