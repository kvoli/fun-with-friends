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
import DeletePopup from "./DeletePopup";
import { useSelector } from 'react-redux';
import LoadingCircle from "./LoadingCircle";


const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0.5, 0.5)
  },
  cardContent: {
    flexGrow: 1,
    marginBottom: 0,
    paddingBottom: 0,
    paddingTop: 10,
    paddingRight: 28,
    paddingLeft: 28,
    "&:last-child": {
      paddingBottom: 6
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
  },
}));

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const ArtifactDetailed = () => {

  const classes = useStyles();
  const artifact = useSelector(store => store.focusView.artifactDetailView.artifact)

  return (
    <Grid container justify="center" className={classes.contained}>
    {artifact ? (
      <Card>
        <CardMedia
          component='img'
          className={classes.cardMedia}
          image={artifact.src}
          title={artifact.title}
          src={artifact.src}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.cardText}>
            <Grid container justify="space-between">
              <Grid item >
                <Typography gutterBottom variant='h4'>
                  {artifact.title}
                </Typography>
              </Grid>
              <Grid item>
              <Grid container direction="row-reverse" justify="flex-end">
                <Grid item>
                  <IconButton >
                    <EditIcon color="primary" fontSize="default" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <DeletePopup />
                </Grid>
              </Grid>
              </Grid>
            </Grid>
            <Typography gutterBottom color="textSecondary" variant='body2' paragraph >
              {artifact.text}
            </Typography>
            <Divider variant='middle' />
            <Typography variant="h6">
              Relations
            </Typography>
            <List dense={true}>
              {generate(
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="John Smith" src="https://material-ui.com/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="John Smith"
                    secondary="1913 - 1949 | United Kingdom | Soldier"
                  />
                </ListItem>,
              )}
            </List>
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
    ) : (<LoadingCircle />)
    }
    </Grid>
  );
}

export default ArtifactDetailed;