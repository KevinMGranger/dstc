import React, { useState } from "react";
import Outputs from "./Outputs";
import data from "../domain/plants.json";
import { parsePlants, byName } from "../domain/plant";

const plants = parsePlants(data).unsafeCoerce();

export default {
  title: "Outputs",
  component: Outputs,
};

export const Primary: React.VFC<{}> = () => {
  return Outputs({
    plantsByName: byName(plants),
    quantities: {
      Corn: 2,
      Carrot: 1,
    },
  });
};
