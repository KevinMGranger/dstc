import React from "react";
import { Plant } from "../domain/plant";
import { pipe } from "remeda";
import { Grid, TextField } from "@material-ui/core";

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
        <Grid item xs={12} sm={6}>{plant.name}</Grid>
        <Grid item xs={12} sm={6}>{plant.seed}</Grid>
      </Grid>
      <Grid container item xs={4}>
        <Grid item xs={3}>{plant.formula}</Grid>
        <Grid item xs={3}>{plant.compost}</Grid>
        <Grid item xs={3}>{plant.manure}</Grid>
        <Grid item xs={3}>{plant.water}</Grid>
      </Grid>
      <Grid item xs={4}>
        <TextField
          type="number"
          value={qty}
          onChange={(e) => pipe(e.target.value, (n) => parseInt(n, 10), setQty)}
        ></TextField>
      </Grid>
    </Grid>
  );
}
