import React from 'react';
import TextField from '@material-ui/core/TextField';
import { filterArtifacts } from '../actions/index';
import { useSelector, useDispatch } from 'react-redux';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { artifactFilter } = useSelector(store => store.filters);

  function handleChange(event) {
    dispatch(filterArtifacts(event.target.value));
  }

  return (
    <TextField
      id='standard-textarea'
      label='Filter'
      placeholder='enter a title to filter artifacts'
      margin='normal'
      onChange={handleChange}
      value={artifactFilter}
    />
  );
};

export default SearchBar;
