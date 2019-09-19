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
import ChipInput from 'material-ui-chip-input';

function renderInput(inputProps) {
  const { value, onChange, chips, ref, label, name, ...other } = inputProps;

  return <ChipInput clearInputValueOnChange fullWidth onUpdateInput={onChange} value={chips} inputRef={ref} label={label} name={name} {...other} />;
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);

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

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

function getSuggestions(value, suggestionList) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestionList.filter(suggestion => {
        const keep = count < 5 && suggestion.toLowerCase().slice(0, inputLength) === inputValue;

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

const SuggestInput = ({ field, setField, label, name, suggestionList }) => {
  const classes = useStyles();
  const [suggestions, setSuggestions] = React.useState([]);
  const [textFieldInput, setTextFieldInput] = React.useState('');

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, suggestionList));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions(getSuggestions('', suggestionList));
  };

  const handletextFieldInputChange = (event, { newValue }) => {
    setTextFieldInput(newValue);
  };

  const handleAddChip = chip => {
    if (field.indexOf(chip) < 0) {
      setField([...field, chip]);
      setTextFieldInput('');
    }
  };

  const handleDeleteChip = chip => {
    setField(field.filter(val => val !== chip));
    return field;
  };

  return (
    <Autosuggest
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderInputComponent={renderInput}
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={(e, { suggestionValue }) => {
        handleAddChip(suggestionValue);
        e.preventDefault();
      }}
      focusInputOnSuggestionClick={false}
      inputProps={{
        chips: field,
        value: textFieldInput,
        onChange: handletextFieldInputChange,
        onAdd: chip => handleAddChip(chip),
        onDelete: (chip, index) => handleDeleteChip(chip, index),
        label,
        name,
      }}
    />
  );
};

export default SuggestInput;
