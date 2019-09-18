import React from 'react';
import TextField from '@material-ui/core/TextField';
import { addCircleUser } from '../actions/circle';
import { useDispatch, useSelector } from 'react-redux';

const AddMember = ({ circle }) => {
  const [memberForm, setMemberForm] = React.useState('');
  const token = useSelector(store => store.auth.token);
  const dispatch = useDispatch();

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }
  };

  function handleSubmit() {
    setMemberForm('');
    dispatch(addCircleUser(memberForm, circle, token));
  }

  function handleChange(event) {
    event.preventDefault();
    event.stopPropagation();
    setMemberForm(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id='outlined-dense'
        label='Add Member'
        placeholder="enter a user's name"
        margin='dense'
        variant='outlined'
        onChange={handleChange}
        value={memberForm}
        onKeyDown={onKeyDown}
      />
    </form>
  );
};

export default AddMember;
