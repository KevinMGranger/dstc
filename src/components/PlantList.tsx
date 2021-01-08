import { Container } from "@material-ui/core";
import React, {
  Dispatch,
  SetStateAction
} from "react";
import { Plant } from "../domain/plant";
import PlantRow from "./PlantRow";

export default function PlantList({
  plants,
  forPlant,
}: {
  plants: Plant[];
  forPlant: (plantName: string) => [number, Dispatch<SetStateAction<number>>];
}) {
  return (
    <Container>
      {plants.map((plant) => {
        const [qty, setQty] = forPlant(plant.name);
        return (
          <PlantRow key={plant.name} {...{ plant, qty, setQty }}></PlantRow>
        );
      })}
    </Container>
  );
}
