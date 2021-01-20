import { Container } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { useImmer } from "use-immer";
import { byName, Plant } from "../domain/plant";
import { mapStateLens, updaterToSetState } from "../utils";
import Outputs from "./Outputs";
import PlantList from "./PlantList";
import TopRow from "./TopRow";

export default function CalculatorView({ plants }: { plants: Plant[] }) {
  const plantsByName = byName(plants);
  const freshMap = () => new Map(plants.map((plant) => [plant.name, 0]));
  const [plantQuantities, setPlantQuantities] = useImmer(freshMap);
  const reset = () => setPlantQuantities(freshMap);

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
      <TopRow plantsByName={plantsByName} quantities={plantQuantities} reset={reset}/>
      <PlantList {...{ plants, forPlant }}></PlantList>
    </Container>
  );
}
