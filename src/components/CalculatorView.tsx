import React, { Dispatch, SetStateAction, useState } from "react";
import { byName, Nutrients, Plant } from "../domain/plant";
import { Container, Grid } from "@material-ui/core";
import { useImmer } from "use-immer";
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
      plantName
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
