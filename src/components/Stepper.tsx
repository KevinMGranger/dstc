import {
  Button,
  ButtonGroup,
  TextField
} from "@material-ui/core";
import React from "react";
import { pipe } from "remeda";

export default function Stepper({
  value,
  set,
}: {
  value: number;
  set: (newValue: number) => void;
}) {
  return (
    <ButtonGroup color="primary">
      <Button onClick={() => set(value - 1)}>-</Button>
      <TextField
        type="number"
        value={value}
        onChange={(e) => pipe(e.target.value, (n) => parseInt(n, 10), set)}
      />
      <Button onClick={() => set(value + 1)}>+</Button>
    </ButtonGroup>
  );
}Î
