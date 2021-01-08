import { Container } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { useImmer } from "use-immer";
import { byName, Plant } from "../domain/plant";
import { mapStateLens, updaterToSetState } from "../utils";
import Outputs from "./Outputs";
import PlantList from "./PlantList";

export default function CalculatorView({ plants }: { plants: Plant[] }) {
  const plantsByName = byName(plants);
  const [plantQuantities, setPlantQuantities] = useImmer(
    () => new Map(plants.map((plant) => [plant.name, 0]))
  );

  function forPlant(
    plantName: string
  ): [number, Dispatch<SetStateAction<number>>] {
    const [current, updater] = mapStateLens(
      plantQuantities,
      setPlantQuantities,
      plantName,
      0
    );
    const setter = updaterToSetState(updater);
    return [current, setter];
  }

  return (
    <Container>
      <Outputs
        plantsByName={plantsByName}
        quantities={plantQuantities}
      ></Outputs>
      <PlantList {...{ plants, forPlant }}></PlantList>
    </Container>
  );
}
