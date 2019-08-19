import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

const ArtifactGrid = props => (
    <div style={{marginTop: 20, padding: 120}}>
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
                <Grid item key={artifact.id}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={artifact.title}
                                image={artifact.src}
                                title={artifact.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {artifact.title}
                                </Typography>
                                <Typography component="p">{artifact.desc}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">Edit</Button>
                            <Button size="small" color="red">Delete</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </div>
)

export default ArtifactGrid