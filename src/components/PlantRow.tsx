import { Grid } from "@material-ui/core";
import React from "react";
import { Plant } from "../domain/plant";
import Stepper from "./Stepper";

export default function PlantRow({
  plant,
  qty,
  setQty,
}: {
  plant: Plant;
  qty: number;
  setQty: (qty: number) => void;
}) {
  return (
    <Grid container>
      <Grid container item xs={4}>
        <Grid item xs={12} sm={6}>
          {plant.name}
        </Grid>
        <Grid item xs={12} sm={6}>
          {plant.seed}
        </Grid>
      </Grid>
      <Grid container item xs={4}>
        <Grid item xs={3}>
          {plant.formula}
        </Grid>
        <Grid item xs={3}>
          {plant.compost}
        </Grid>
        <Grid item xs={3}>
          {plant.manure}
        </Grid>
        <Grid item xs={3}>
          {plant.water}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Stepper value={qty} set={setQty} />
      </Grid>
    </Grid>
  );
}
