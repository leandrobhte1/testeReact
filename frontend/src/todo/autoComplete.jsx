import React from 'react'

import Autosuggest from 'react-autosuggest';

import axios from 'axios'

const URL = 'http://localhost:3007/api/todos'

const URLLanguages = 'http://localhost:3007/api/languages'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { add, changeDescription, search, clear, handlerKey, addLanguage, searchLanguages, changeDescriptionValue } from './todoActions'

var languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'C++',
    year: 1995
  },
  {
    name: 'C#',
    year: 1995
  },
  {
    name: 'NODE',
    year: 1995
  },
  {
    name: 'COBOL',
    year: 1995
  },
  {
    name: 'Scala',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  }
];

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

function getSuggestions(value) {

  const escapedValue = escapeRegexCharacters(value.trim()); // See: https://github.com/moroshko/react-autosuggest/blob/master/demo/src/components/utils/utils.js#L2-L4

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
    return suggestion.name;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span className="opcaoLanguage">{suggestion.name}</span>
  );
}

class AutoComplete extends React.Component {
  constructor() {
      console.log("constructor");
    super();

    this.state = {
      value: '',
      suggestions: getSuggestions(''),
      options: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

//   componentWillMount() {
//     const { add, clear, search, description, keyHandler, searchLanguages } = this.props
//     this.languages = searchLanguages()
//     console.log("franklin.: ",this.languages);
//   }

  onChange(event, { newValue, method }) {
    if (method === 'type') {
      this.setState({
        value: newValue,
        suggestions: getSuggestions(newValue)
      });
    } else {
      this.setState({
        value: newValue
      });
    }
    this.props.changeDescriptionValue(newValue);
  }

  onSuggestionSelected(event, { suggestionValue }) {
    this.setState({
      suggestions: getSuggestions(suggestionValue)
    });
  }

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested({ value }){
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    });
  };


  render() {
    const { value, suggestions, options } = this.state;
    const { add, clear, search, description, keyHandler, searchLanguages } = this.props
    const inputProps = {
      placeholder: 'Type a programming language',
      value: this.props.description,
      onChange: this.onChange,
      onKeyUp: this.props.handlerKey
    };


    return (
      <Autosuggest suggestions={suggestions}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps}
                   onSuggestionSelected={this.onSuggestionSelected}
                   onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                   onSuggestionsClearRequested={this.onSuggestionsClearRequested} />
    );
  }
}

const mapStateToProps = state => ({description: state.todo.description})

const mapDispatchToProps = dispatch => bindActionCreators({ add, changeDescription, search, clear, handlerKey, addLanguage, searchLanguages, changeDescriptionValue }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete)