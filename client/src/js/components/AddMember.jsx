import React from 'react';
import TextField from '@material-ui/core/TextField';
import { addCircleUser } from '../actions/circles';
import { useDispatch } from 'react-redux';

const AddMember = ({ circle }) => {
  const [memberForm, setMemberForm] = React.useState('');
  console.log(circle);
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
    dispatch(addCircleUser({ memberid: memberForm, circleid: circle }));
  }

  function handleChange(event) {
    event.preventDefault();
    event.stopPropagation();
    setMemberForm(event.target.value);
    console.log(memberForm);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="outlined-dense"
        label="Add Member"
        placeholder="enter a user's name"
        margin="dense"
        variant="outlined"
        onChange={handleChange}
        value={memberForm}
        onKeyDown={onKeyDown}
      />
    </form>
  );
};

export default AddMember;
