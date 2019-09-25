/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/require-default-props */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addCircleUser, addCircleAdmin } from '../actions/circle';

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.username, query);
  const parts = parse(suggestion.username, matches);

  return (
    <MenuItem
      selected={isHighlighted}
      component='div'
      onMouseDown={e => e.preventDefault()} // prevent the click causing the input to be blurred
    >
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <span key={String(index)}>{part.text}</span>
          );
        })}
      </div>
    </MenuItem>
  );
}

const renderSuggestionsContainer = (options) => {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

const getSuggestionValue = (suggestion) => {
  return suggestion.username;
}

const getSuggestions = (value, suggestionList) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestionList.filter(suggestion => {
        const keep = count < 5 && suggestion.username.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
}));

const getID = user => {
  return user[0].id;
};

const getUserID = (userlist, username) => {
  return getID(userlist.filter(user => user.username === username));
};

const AddCircleMembers = ({ circle, admin=false }) => {
  const classes = useStyles();
  const suggestionList = useSelector(store => store.user);
  const token = useSelector(store => store.auth.token);
  const [suggestions, setSuggestions] = React.useState([]);
  const [textFieldInput, setTextFieldInput] = React.useState('');
  const dispatch = useDispatch();

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, suggestionList));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions(getSuggestions('', suggestionList));
  };

  const handletextFieldInputChange = (event, { newValue }) => {
    setTextFieldInput(newValue);
  };

  return (
    <Autosuggest
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={(e, { suggestionValue }) => {
        if (admin) {
          dispatch(addCircleAdmin(getUserID(suggestionList, suggestionValue), circle, token));
        } else {
          dispatch(addCircleUser(getUserID(suggestionList, suggestionValue), circle, token));
        }
        setTextFieldInput('');
        e.preventDefault();
      }}
      focusInputOnSuggestionClick={true}
      inputProps={{
        value: textFieldInput,
        onChange: handletextFieldInputChange,
      }}
    />
  );
};

export default AddCircleMembers;
