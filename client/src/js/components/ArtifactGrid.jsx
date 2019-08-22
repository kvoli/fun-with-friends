// Import Packages
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Zoom from '@material-ui/core/Zoom';
import Chip from '@material-ui/core/Chip';
import { Divider } from "@material-ui/core";
import UtilityBar from "./UtilityBar";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardText: {
    margin: theme.spacing(1, 0),
  },
  cardTags: {
    margin: theme.spacing(.5, 0),
  },
  chip: {
    margin: theme.spacing(0, 0.25)
  }
}));

const ArtifactGrid = props => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth='lg'>
      <UtilityBar />
      <Grid container spacing={6}>
        {props.artifacts.map(artifact => (
          <Grid item key={artifact.id} xs={14} sm={7} md={4}>
            <Zoom in={true} style={{ transitionDelay: '500ms' }}>
              <Card className={classes.card} >
                <CardActionArea  >
                  <CardMedia
                    component='img'
                    className={classes.cardMedia}
                    image={artifact.src}
                    title={artifact.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <div className={classes.cardText}>
                      <Grid container alignItems='center'>
                        <Grid item xs>
                          <Typography gutterBottom variant='h6'>
                            {artifact.title}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography gutterBottom variant='body2'>
                            Sep 2, 1922
      </Typography>
                        </Grid>
                      </Grid>
                      <Typography color="textSecondary" variant='body2'>
                        {artifact.desc} that shouldn't be too long hopefully, but you never know.
      </Typography>
                    </div>
                    <Divider variant='middle' />
                    <div className={classes.cardTags} >
                      <Grid container allignItems='center'>
                        {artifact.tags.map(tag => (
                          <Grid item>
                            <Chip className={classes.chip} label={tag.label} />
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ArtifactGrid;
