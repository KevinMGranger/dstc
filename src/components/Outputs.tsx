import { Box, Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { contributions } from "../domain/calculations";
import { Nutrients, Plant } from "../domain/plant";
import { Mapping } from "../utils";

export default function Outputs({
  plantsByName,
  quantities,
}: {
  plantsByName: Record<string, Plant>;
  quantities: Mapping<string, number>;
}) {
  const amounts = contributions(plantsByName, quantities);
  return (
      <Grid container>
        {["formula", "compost", "manure", "water"].map((nutrient) => (
          <Grid container item xs={3}>
            <Grid item xs={12}>
              {nutrient}
            </Grid>
            <Grid item xs={12}>
              {amounts[nutrient as keyof Nutrients]}
            </Grid>
          </Grid>
        ))}
      </Grid>
  );
}
