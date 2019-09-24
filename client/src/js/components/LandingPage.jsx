import React from 'react';
import { Typography, Grid, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { downloadLogo, communityLogo, shareLogo, v, x, y, z, w, t, u } from '../../SVG/SVGImages';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 10,
    marginTop: 40,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  gridListIcon: {
    width: 400,
    height: 400,
    transform: 'translateZ(0)',
  },
  container: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    height: '100%',
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    marginBottom: 20,
    paddingBottom: 20,
    marginTop: 15,
    paddingTop: 15,
    padding: theme.spacing(0.75, 2.5, 0),
  },
}));

const tileImages = [v, x, y, z, w, t, u];
const logoImages = [
  {
    img: downloadLogo,
    title: 'Upload Your Artifacts.',
  },
  {
    img: shareLogo,
    title: 'Share With Friends',
  },
  {
    img: communityLogo,
    title: 'Create Your Community.',
  },
];

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Grid container direction='column' justify='space-evenly' alignItems='center' spacing={10}>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {tileImages.map(tile => (
            <GridListTile key={tile}>
              <img src={tile} alt='' />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <div>
        <Typography variant='h1' className={classes.title}>
          Fun. With. Friends.
        </Typography>
      </div>
      <div>
        <GridList cellHeight={400} cellWidth={400} className={classes.gridList} cols={1}>
          {logoImages.map(logo => (
            <GridListTile key={logo.img} cols={1}>
              <img src={logo.img} alt='' width='400' height='400' />
              <GridListTileBar title={logo.title} align='center' />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Grid>
  );
};

export default LandingPage;
