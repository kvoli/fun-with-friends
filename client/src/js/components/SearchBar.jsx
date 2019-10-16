import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { filterArtifacts } from '../actions/index';

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
      placeholder='Filter by artefact name or title'
      margin='normal'
      onChange={handleChange}
      value={artifactFilter}
    />
  );
};

export default SearchBar;
