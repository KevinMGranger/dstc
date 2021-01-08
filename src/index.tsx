import { enableMapSet } from "immer";
import React from "react";
import * as ReactDOM from "react-dom";
import CalculatorView from './components/CalculatorView';
import { parsePlants } from "./domain/plant";
import data from './domain/plants.json';

enableMapSet()

const plants = parsePlants(data).unsafeCoerce();

var mountNode = document.getElementById("app");
ReactDOM.render(<CalculatorView plants={plants} />, mountNode);