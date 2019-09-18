import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';

import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';

const Chat = () => {
  const [messages, setMessages] = React.useState([]);
  const [current, setCurrent] = React.useState('');

  const onReceivedMessage = message => {
    setMessages([...messages, message]);
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }
  };

  const handleChange = event => {
    event.preventDefault();
    event.stopPropagation();
    setCurrent(event.target.value);
  };

  const handleSubmit = () => {
    onSend(current);
    setMessages([...messages, current]);
    setCurrent('');
  };

  const socket = useSelector(store => store.socket.chatSocket);

  socket.on('message', onReceivedMessage);

  function onSend(message) {
    socket.emit('message', message);
  }

  return (
    <Container maxWidth='xl'>
      <List>
        {messages.map(msg => (
          <ListItem key={msg}>
            <ListItemAvatar>
              <Avatar>?</Avatar>
            </ListItemAvatar>
            <ListItemText primary={msg} />
          </ListItem>
        ))}
      </List>
      <ListItem key='textentry'>
        <ListItemAvatar>
          <Avatar>?</Avatar>
        </ListItemAvatar>
        <form onSubmit={handleSubmit}>
          <TextField
            id='outlined-dense'
            label='Circle Chat'
            placeholder='type to chat'
            margin='dense'
            variant='outlined'
            onChange={handleChange}
            value={current}
            onKeyDown={onKeyDown}
          />
        </form>
      </ListItem>
    </Container>
  );
};

export default Chat;
