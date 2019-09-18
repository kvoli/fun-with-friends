import React from 'react';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { t, u, v, w, x, y, z } from '../../SVG/SVGImages';
import {
  Typography,
  ListItem,
  List,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Grid,
  Avatar,
  IconButton,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddMember from './AddMember';
import RemoveMember from './RemoveMember';
// import Chat from "./Chat";

const headerImages = [t, u, v, w, x, y, z];

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4)
  },
  header: {
    maxHeight: '50vh'
  }
}));

const GroupPage = props => {
  const [addMode, setAddMode] = React.useState(false);
  const circle = useSelector(
    store => store.circles.circles[props.match.params.id]
  );
  console.log(circle);

  const classes = useStyles();

  return (
    <Container maxWidth="lg" justify="space-between">
      <Grid container direction="column">
        <Grid item className={classes.container}>
          <Typography gutterButtom variant="h3" component="h3" cent>
            {circle.title}
          </Typography>
          <Typography gutterBottom variant="h5" color="textSecondary">
            {circle.description}
          </Typography>
        </Grid>
        <Grid item>
          <Box>
            <img src={y} alt="" />
          </Box>
        </Grid>
        <Grid item className={classes.container}>
          <Grid container spacing={4}>
            <Grid item>
              <Typography>Admins</Typography>
              <Grid container>
                {circle.admins.map(admin => (
                  <Grid item>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>{admin.slice(0, 2)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={admin} secondary="description" />
                      </ListItem>
                    </List>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <Typography>Members</Typography>
              <Grid container>
                {circle.members.map(member => (
                  <Grid item>
                    <List>
                      <ListItem>
                        <RemoveMember
                          props={{ circle: circle.id, member: member }}
                        />
                        <ListItemText
                          primary={member}
                          secondary="description"
                        />
                      </ListItem>
                    </List>
                  </Grid>
                ))}
                <Grid item>
                  {!addMode ? (
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Button onClick={() => setAddMode(true)}>
                              <AddIcon />
                            </Button>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="add member" />
                      </ListItem>
                    </List>
                  ) : (
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>?</Avatar>
                        </ListItemAvatar>
                        <AddMember circle={circle.id} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => setAddMode(false)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Chat /> */}
    </Container>
  );
};

export default GroupPage;
