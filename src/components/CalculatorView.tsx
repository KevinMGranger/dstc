import { Container } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useImmer } from "use-immer";
import { byName, Plant } from "../domain/plant";
import { composeSetState, mapStateLens, updaterToSetState } from "../utils";
import Outputs from "./Outputs";
import PlantList from "./PlantList";
import TopRow from "./TopRow";

export default function CalculatorView({ plants }: { plants: Plant[] }) {
  const plantsByName = byName(plants);
  const freshMap = () => new Map(plants.map((plant) => [plant.name, 0]));
  const [plantQuantities, setPlantQuantities] = useState(freshMap);
  const reset = () => setPlantQuantities(freshMap);

  function forPlant(
    plantName: string
  ): [number, Dispatch<SetStateAction<number>>] {
    const [current, setter] = mapStateLens(
      plantQuantities,
      setPlantQuantities,
      plantName,
      0
    );

    const setterWithMin = composeSetState(setter, (num) => (num < 0) ? 0 : num)
    return [current, setterWithMin];
  }

  return (
    <Container>
      <TopRow plantsByName={plantsByName} quantities={plantQuantities} reset={reset}/>
      <PlantList {...{ plants, forPlant }}></PlantList>
    </Container>
  );
}
