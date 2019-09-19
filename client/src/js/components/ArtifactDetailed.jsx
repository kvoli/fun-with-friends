/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, Card, CardContent, Divider, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import DeletePopup from './DeletePopup';
import LoadingCircle from './LoadingCircle';
import { openArtifactForm, artifactSwitch } from '../actions/index';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0.5, 0.5),
  },
  cardContent: {
    flexGrow: 1,
    marginBottom: 0,
    paddingBottom: 0,
    paddingTop: 10,
    paddingRight: 28,
    paddingLeft: 28,
    '&:last-child': {
      paddingBottom: 6,
    },
  },
  cardText: {
    margin: theme.spacing(1, 0),
  },
  cardTags: {
    margin: theme.spacing(0.5, 0),
  },
  chip: {
    margin: theme.spacing(0, 0.25),
  },
}));

const relatives = [
  { name: 'Harry McClernon', about: 'Soldier | Infantry | 1894-1931' },
  { name: 'Mary McClernon', about: 'Homemaker | Daughter | 1915-1977' },
  { name: 'Rose McClernon', about: 'Teacher | Wife | 1896-1941' },
];

const ArtifactDetailed = ({ artifact }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const defaultImage = 'https://www.spiritdental.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';

  return (
    <Grid container justify='center'>
      {artifact ? (
        <Card>
          <CardMedia
            component='img'
            className={classes.cardMedia}
            image={artifact.src ? artifact.src : defaultImage}
            title={artifact.title}
            src={artifact.src ? artifact.src : defaultImage}
          />
          <CardContent className={classes.cardContent}>
            <div className={classes.cardText}>
              <Grid container justify='space-between'>
                <Grid item>
                  <Typography gutterBottom variant='h4'>
                    {artifact.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container direction='row-reverse' justify='flex-end'>
                    <Grid item>
                      <IconButton
                        onClick={() => {
                          dispatch(openArtifactForm(artifact));
                          dispatch(artifactSwitch(artifact));
                        }}
                      >
                        <EditIcon color='primary' fontSize='default' />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <DeletePopup />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Typography gutterBottom color='textSecondary' variant='body2' paragraph>
                {artifact.text}
              </Typography>
              <Divider variant='middle' />
              <Typography variant='h6'>Relations</Typography>
              <List dense>
                {relatives.map(relative => (
                  <ListItem key={relative.name} alignItems='flex-start'>
                    <ListItemAvatar>
                      <Avatar alt={relative.name} />
                    </ListItemAvatar>
                    <ListItemText primary={relative.name} secondary={relative.about} />
                  </ListItem>
                ))}
              </List>
            </div>
            <Divider variant='middle' />
            <div className={classes.cardTags}>
              <Grid container>
                {artifact.tags
                  ? artifact.tags.split(',').map(tag => (
                      <Grid item key={tag}>
                        <Chip className={classes.chip} label={tag} />
                      </Grid>
                    ))
                  : 'no tags :('}
              </Grid>
            </div>
          </CardContent>
        </Card>
      ) : (
        <LoadingCircle />
      )}
    </Grid>
  );
};

export default ArtifactDetailed;
