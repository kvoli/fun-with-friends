/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, GridListTile, GridList, GridListTileBar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import { artifactSwitch } from '../actions/index';
import ArtifactModal from './ArtifactModal';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

// const getCircleArtifacts = (circle, artifacts) => {
//   return circle.artifacts ? artifacts.map(artifact => circle.arifacts.includes(artifact.id)) : artifacts;
// };

const CirclesArtifactsFeed = ({ circle }) => {
  const classes = useStyles();
  const artifacts = useSelector(store => store.artifacts);
  const [focus, setFocus] = React.useState(false);
  const dispatch = useDispatch();
  const circleArtifacts = artifacts.filter(artifact => circle.artifacts.includes(artifact.id));

  return (
    <Grid container alignItems='center' direction='column' justify='center' className={classes.cardGrid}>
      <Grid item>
        <Typography gutterBottom variant='h4'>
          {circle.title}'s Artifact Feed
        </Typography>
      </Grid>
      <GridList cellHeight={250} cols={3}>
        {circleArtifacts.map(artifact => (
          <GridListTile
            key={artifact.id}
            onMouse={() => setFocus(false)}
            onMouseEnter={() => setFocus(artifact)}
            onClick={() => dispatch(artifactSwitch(artifact))}
          >
            <img src={artifact.src} alt={artifact.title} />
            {focus && focus === artifact ? <GridListTileBar title={artifact.title} subtitle={<span>{artifact.desc}</span>} /> : ''}) }
          </GridListTile>
        ))}
      </GridList>
      <ArtifactModal />
    </Grid>
  );
};

export default CirclesArtifactsFeed;
