import { entries, Mapping } from "../utils";
import { Plant, Nutrients, mulNutrients, addNutrients, zeroNutrients, byName } from "./plant"

export function contributions(plantsByName: Record<string, Plant>, quantities: Mapping<string, number>, start: Nutrients = zeroNutrients()): Nutrients {
    return entries(quantities).reduce<Nutrients>((acc, [name, qty]) => {
        const plant = plantsByName[name];

        const multipliedPlant = mulNutrients(plant, qty);

        return addNutrients(acc, multipliedPlant);
    }, start);
}