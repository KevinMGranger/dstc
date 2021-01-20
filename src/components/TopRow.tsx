import { Button, Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import Outputs from "./Outputs";

type OutputsProps = Parameters<typeof Outputs>[0];
type Props = OutputsProps & {
  reset: () => void;
};

export default function TopRow(props: Props) {
  return (
    <Grid container>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Outputs {...props} />
      </Grid>
      <Grid item xs={4}>
        <Button variant="outlined" onClick={props.reset}>Reset</Button>
      </Grid>
    </Grid>
  );
}
