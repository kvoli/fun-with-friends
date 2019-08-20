import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

const ArtifactItem = props => {
    return (
        <Grid item key={props.artifact.id}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={props.artifact.title}
                        image={props.artifact.src}
                        title={props.artifact.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.artifact.title}
                        </Typography>
                        <Typography component="p">{props.artifact.desc}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">Edit</Button>
                    <Button size="small" color="secondary">Delete</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};


export default ArtifactItem;