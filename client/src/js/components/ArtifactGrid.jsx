import React from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ArtifactGridItem from "./ArtifactGridItem"

const ArtifactGrid = props => (
    <div style={{ marginTop: 20, padding: 120 }}>
        <TextField
            id="standard-textarea"
            label="Filter"
            placeholder="type a date"
            multiline
            margin="normal"
        />
        <Grid
            container
            spacing={4}
            justify="space-evenly"
            direction="row"
            allignItems="center"
        >
            {props.artifacts.map(artifact => (
                <ArtifactGridItem artifact={artifact} />
            ))}
        </Grid>
    </div>
);

export default ArtifactGrid;