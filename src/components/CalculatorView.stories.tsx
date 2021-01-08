import React, { useState } from "react";
import CalculatorView from "./CalculatorView";
import data from "../domain/plants.json";
import { parsePlants, byName } from "../domain/plant";
import { enableMapSet } from "immer";

const plants = parsePlants(data).unsafeCoerce();

export default {
  title: "CalculatorView",
  component: CalculatorView,
};

enableMapSet()

export const Primary: React.VFC<{}> = () => {
  return CalculatorView({ plants });
};
