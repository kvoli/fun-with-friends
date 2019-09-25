import React from 'react';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
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
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { y } from '../../SVG/SVGImages';
import AddMember from './AddMember';
import RemoveMember from './RemoveMember';
import DeleteCircle from './DeleteCircle';
import CirclesArtifactsFeed from './CircleArtifactsFeed';
import AdminAvatar from './CirclePage/AdminAvatar';
// import Chat from "./Chat";

const indexUser = userObject => {
  return userObject[0];
};

const getUser = (userID, userList) => {
  return indexUser(userList.filter(usr => usr.id === userID));
};

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
  },
  header: {
    maxHeight: '50vh',
  },
  feed: {
    marginTop: theme.spacing(4),
  },
  tabPanel: {
    display: 'none',
  },
  tabSpacing: {
    marginTop: theme.spacing(2.5),
  },
}));

const GroupPage = props => {
  const user = useSelector(store => store.auth.user);
  const circle = useSelector(store => store.circle.circles[props.match.params.id]);
  const adminPerms = circle.admins.includes(user.id);

  const [addAdmin, setAddAdmin] = React.useState(false);
  const [addMember, setAddMember] = React.useState(false);
  // eslint-disable-next-line react/prop-types
  const userList = useSelector(store => store.user);
  const [tabValue, setTabValue] = React.useState(0);

  const classes = useStyles();

  return (
    <Container maxWidth='lg' justify='space-between'>
      <Grid container direction='column'>
        <Grid item className={classes.container}>
          <Typography variant='h3' component='h3'>
            {circle.title}
          </Typography>
          <Grid container direction='row' alignItems='center'>
            <Grid item>
              <Typography variant='h5' color='textSecondary'>
                {circle.description}
              </Typography>
            </Grid>
            <Grid item>
              <DeleteCircle circle={circle} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems='center' justify='center'>
            <Grid item>
              <img src={y} alt='' />
            </Grid>
          </Grid>
        </Grid>
        <Grid container alignItems='center' justify='center' direction='column' className={classes.tabSpacing}>
          <Paper square>
            <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} centered>
              <Tab label={circle.public ? 'Admins' : 'Members & Admins'} value={0} />
              <Tab label='Artifact Feed' value={1} />
              <Tab label='Chat' value={2} />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item className={tabValue === 0 ? classes.container : classes.tabPanel}>
          <Grid container spacing={4} direction='column'>
            <Grid item>

              <Typography>Admins</Typography>
              <Grid 
                container
                direction='row'
                alignItems='center'
              >
                {circle.admins.map(admin => (
                  <Grid item key={admin}>
                    <List>
                      <ListItem key={admin}>
                        <AdminAvatar props={{ circle: circle.id, member: getUser(admin, userList), adminPerms }} />
                        <ListItemText primary={getUser(admin, userList).username} secondary={getUser(admin, userList).email} />
                      </ListItem>
                    </List>
                  </Grid>
                ))}
                
                {adminPerms ? 
                  <Grid item>
                    {!addAdmin ? (
                      <List>
                        <ListItem key='add'>
                          <ListItemAvatar>
                            <Avatar>
                              <Button onClick={() => setAddAdmin(true)}>
                                <AddIcon />
                              </Button>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary='add admin' secondary=''/>
                        </ListItem>
                      </List>
                    ) : (
                      <List>
                        <ListItem key='add-user'>
                          <ListItemAvatar>
                            <Avatar>?</Avatar>
                          </ListItemAvatar>
                          <AddMember circle={circle.id} admin={true}/>
                          <ListItemSecondaryAction>
                            <IconButton edge='end' onClick={() => setAddAdmin(false)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    )}
                  </Grid> : 
                  <div/>
                }
              </Grid>
            </Grid>
            {!circle.public ? 
              <Grid item>

                <Typography>Members</Typography>
                <Grid 
                  container
                  direction='row'
                  alignItems='center'
                >
                  {circle.members.map(member => (
                    <Grid item key={member}>
                      <List>
                        <ListItem key={member}>
                          <RemoveMember props={{ circle: circle.id, member: getUser(member, userList), adminPerms }} />
                          <ListItemText primary={getUser(member, userList).username} secondary={getUser(member, userList).email} />
                        </ListItem>
                      </List>
                    </Grid>
                  ))}

                  {adminPerms ? 
                    <Grid item>
                      {!addMember ? (
                        <List>
                          <ListItem key='add'>
                            <ListItemAvatar>
                              <Avatar>
                                <Button onClick={() => setAddMember(true)}>
                                  <AddIcon />
                                </Button>
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='add member' secondary=''/>
                          </ListItem>
                        </List>
                      ) : (
                        <List>
                          <ListItem key='add-user'>
                            <ListItemAvatar>
                              <Avatar>?</Avatar>
                            </ListItemAvatar>
                            <AddMember circle={circle.id} />
                            <ListItemSecondaryAction>
                              <IconButton edge='end' onClick={() => setAddMember(false)}>
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </List>
                      )}
                    </Grid> :
                    <div/>
                  }
                </Grid>
              </Grid> : 
              <div/>
            }
          </Grid>
        </Grid>
        <Grid item className={tabValue === 1 ? classes.feed : classes.tabPanel}>
          <CirclesArtifactsFeed circle={circle} />
        </Grid>
        <Grid item className={tabValue === 2 ? classes.feed : classes.tabPanel}>
          nothing to see here!
        </Grid>
      </Grid>
      {/* <Chat /> */}
    </Container>
  );
};

export default GroupPage;
