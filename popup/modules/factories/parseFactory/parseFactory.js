// This factory handles parsing of search strings and the creation of search objects
angular.module('app.factories').factory('parseFactory', ['$rootScope',  function($rootScopem) {

  var factory = this;

  // toggles the if the user can see the path of the file they are looking at
  var showPath = false;

  // checks if a string has outer quotes or not
  function hasSurroundingQuotes(searchText) {
    if (searchText[0] === "'" && searchText[searchText.length - 1] === "'") {
      return true;
    } else if (searchText[0] === '"' && searchText[searchText.length - 1] === '"') {
      return true;
    }
    return false;
  }

  // removes Outer Quotes
  function removeOuterQuotes (searchText) {
    if (hasSurroundingQuotes(searchText)) {
      searchText = searchText.slice(1, searchText.length - 1);
    }
    return searchText;
  }

  // removes outer quotes and reattaches negativeSearch if needed
  function normalizeText(searchText) {
    //check for negativeSearch
    var negativeSearch = false;
    if (searchText[0] && searchText[1] && searchText[0] === "!" &&
      (searchText[1] === "'" || searchText[1] === '"' ) ) {
      negativeSearch = true;
      searchText = searchText.slice(1);
    }
    // remove quotes
    searchText = removeOuterQuotes(searchText);
    // readded negative
    if (negativeSearch) {
      searchText = '!' + searchText;
    }

    return searchText;
  }

  // this parses the search string into pieces we can used
  // it keeps pieces within quotes together and breaks on spaces when outside of quotes
  // it also handles apostrophes and exclusionary searches
  factory.parseSearchString = function (searchString) {
    var searchList = [];
    var outsideQuotes = true;
    var quoteStack = [];
    var currentString = '';

    for (var i = 0; i < searchString.length; i++) {
      var charOne = searchString[i];

      // if it is a space and we are not currently building a long quote, add the current string to the searchList and set it to empty
      if (charOne === ' ' && outsideQuotes) {
        searchList.push(currentString);
        currentString = '';
      }

      // if it is a single or double quote we go through a couple checks as listed below
      // this uses a stack so that we can capture internal quotes and not accidentally close on an inner quote
      else if (charOne === '"' || charOne === "'") {
        currentString += charOne;
        // if it is an apostrophe - we check that it is a single quote surronded by non spaces on each side,
        // we don't count it as an apostrophe if the preceeding character is a '-' or a  ':' since these are used in speical searches
        if (charOne === "'" && searchString[i - 1] && searchString[i + 1] &&
            searchString[i - 1] !== ' ' && searchString[i + 1] !== ' ' &&
            searchString[i - 1] !== '-' && searchString[i - 1] !== ':') {
          continue;
        }
        // if it is an opening quote
        else if (quoteStack.length === 0) {
          quoteStack.push(charOne);
          outsideQuotes = false;
        }
        // if it matches the top of the stack
        else if (quoteStack[quoteStack.length - 1] === charOne) {
          quoteStack.pop();
          // if it is the final quote in the stack
          if (quoteStack.length === 0) {
            outsideQuotes = true;
          } else { // if it is a middle quote
            outsideQuotes = false;
          }
        }
        // if it doesn't the top of the stack
        else if (quoteStack[quoteStack.length - 1] !== charOne) {
          quoteStack.push(charOne);
          outsideQuotes = false;
        }
      }

      // look for -' or -" and change the - to a ! if it is outside of quotes
      else if (charOne === '-' && searchString[i + 1]) {
        var charTwo = searchString[i + 1];
        if ( (charTwo === '"' || charTwo === "'") && outsideQuotes) {
          currentString += '!';
        } else {
          currentString += charOne;
        }
      }

      // if it is not a special case add it to the string
      else {
        currentString += charOne;
      }

    }
    // if the current string was never finished, add it now
    if (currentString !== ' ') {
      searchList.push(currentString);
    }
    return searchList;
  };

  // returns a search object to be used in the multiFilter, input is the array created by the parseSearchString function,
  // this input is an array of strings
  factory.getSearchObject = function (searchArray) {
    var toReturn = {};
    // we fill this object with strings that we will filter by
    var names = [];
    var urls = [];
    var wildcards = [];
    var statuses = [];
    var translationProfiles = [];
    var types = [];
    var ids = [];

    var regex = /(\S)+:/;
    // iterate through the strings
    for (var i = 0; i < searchArray.length; i++) {
      // search
      searchText = searchArray[i];
      // use regex to find everything before the first colon
      var matches = searchText.match(regex);
      // this normalizeText function makes the text suitable for our $filter function in the multiFilter
      searchText = normalizeText(searchText);
      // if there is a match
      if(matches !== null && searchText.indexOf('\\:') === -1) {
        var searchMarkup = matches[0];
        // remove the string: that indentifies a string as a special search field
        var searchField = searchMarkup.replace(':','');
        var markupRegex = new RegExp(searchMarkup + "(\\s)*");
        var fieldText = searchText.replace(markupRegex, '');

        var tempText = fieldText;
        // remove negation to check for quotes
        if (fieldText[0] === '!') {
          tempText = tempText.slice(1);
        }
        // make sure the special search is incased in quotes
        var isClosed = hasSurroundingQuotes(tempText);

        // if search field is all or status, add it to the wildcard array,
        // if it is in add it to the url array else add it to the name array, again we normalize the text before we put it in
        if (searchField === 'all' && isClosed) {
          fieldText = normalizeText(fieldText);
          wildcards.push(fieldText);
        } else if (searchField === 'status' && isClosed) {
          fieldText = normalizeText(fieldText);
          // adding alias of untranslated for untracked
          fieldText = fieldText.toLowerCase();
          fieldText = fieldText.replace('untranslated', 'untracked');
          statuses.push(fieldText);
        } else if (searchField === 'in' && isClosed) {
          fieldText = normalizeText(fieldText);
          urls.push(fieldText);
        } else if (searchField === 'profile' && isClosed) {
          fieldText = normalizeText(fieldText);
          fieldText = fieldText.toLowerCase();
          translationProfiles.push(fieldText);
        } else if (searchField === 'type' && isClosed) {
          fieldText = normalizeText(fieldText);
          fieldText = fieldText.toLowerCase();
          types.push(fieldText);
        } else if (searchField === 'id' && isClosed) {
          fieldText = normalizeText(fieldText);
          fieldText = fieldText.toLowerCase();
          ids.push(fieldText);
        } else {
          names.push(searchText);
        }
      }
      else {
        names.push(searchText);
      }
    }

    // if we have a url search and we haven't already run into this, we broadcast to the popupController to show the url in the table
    // the showPath check stops it from firing on every single keystroke, it will only fire the broadcast when there is a change
    if (urls.length > 0 && !showPath) {
      showPath = true;
      $rootScope.$broadcast('togglePath');
    } else if (urls.length === 0 && showPath){
      showPath = false;
      $rootScope.$broadcast('togglePath');
    }

    // add the arrays to the object and return
    toReturn.names = names;
    toReturn.urls = urls;
    toReturn.wildcards = wildcards;
    toReturn.statuses = statuses;
    toReturn.translationProfiles = translationProfiles;
    toReturn.types = types;
    toReturn.ids = ids;
    return toReturn;
  };

  return factory;

}]);
