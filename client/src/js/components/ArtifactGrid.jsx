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
import { artifactSwitch } from "../actions/index.js";
import ArtifactModal from "./ArtifactModal";
import { useSelector, useDispatch } from 'react-redux';
import { getVisibleArtifacts } from "../selectors/index";
import { getAllArtifacts } from "../actions/artifactRequests";

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
    marginBottom: 0,
    paddingBottom: 0,
    padding: theme.spacing(0.75, 2.5, 0),
    "&:last-child": {
      paddingBottom: 2
    }
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
const ArtifactGrid = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(store => store)
  const artifacts = getVisibleArtifacts(state)

  React.useEffect(() => dispatch(getAllArtifacts()), [])
  

  return (
    <Container className={classes.cardGrid} maxWidth='lg'>
      <UtilityBar />
      <Grid container spacing={6}>
        {console.log(artifacts)}
        {artifacts.map(artifact => (
          <Grid item key={artifact.id} xs={12} sm={7} md={4}>
            <Zoom in={true} style={{ transitionDelay: '50ms' }}>
              <Card className={classes.card} >
                <CardActionArea onClick={() => dispatch(artifactSwitch(artifact))} >
                  <CardMedia
                    component='img'
                    className={classes.cardMedia}
                    image={artifact.src}
                    title={artifact.title}
                  />
                </CardActionArea>
                <CardContent className={classes.cardContent}>
                  <div className={classes.cardText}>
                    <Grid container alignItems="center">
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
                    <Typography variant='body2'>
                      Origin: {artifact.origin}
                    </Typography>
                    <Typography color="textSecondary" variant='body2'>
                      {artifact.desc} that shouldn't be too long hopefully, but you never know.
                    </Typography>
                  </div>
                  <Divider variant='middle' />
                  <div className={classes.cardTags} >
                    <Grid container >
                      {artifact.tags.map(tag => (
                        <Grid item key={tag.label}>
                          <Chip className={classes.chip} label={tag.label} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
      <ArtifactModal />
    </Container>
  );
}

export default ArtifactGrid;