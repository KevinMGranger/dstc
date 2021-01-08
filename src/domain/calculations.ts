import { entries, Mapping } from "../utils";
import { addNutrients, mulNutrients, Nutrients, Plant, zeroNutrients } from "./plant";

/**
 * Calculate how the accumulated plants contribute to all nutrients.
 * @param quantities a mapping of plant names to their quantities.
 */
export function contributions(plantsByName: Record<string, Plant>, quantities: Mapping<string, number>, start: Nutrients = zeroNutrients()): Nutrients {
    return entries(quantities).reduce<Nutrients>((acc, [name, qty]) => {
        const plant = plantsByName[name];

        const multipliedPlant = mulNutrients(plant, qty);

        return addNutrients(acc, multipliedPlant);
    }, start);
}