
"use strict";

const searchURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = '43MwYCVPjSmg3YJxXEaUwf3BM9vH1RvRviKofC1P';
let statesList = []; // when state field is entered, push state code to array --statesList

function formatQueryParams(params) { //   not combining params, nedds debugging...
  const queryItems = Object.keys(params)
    .map(key => {
      `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`})
    return queryItems.join('&');
}

function displayResults(response) {
  console.log(response);
  // empty results
  $(".results").empty();
  
  // loop through results
  for (let i = 0; i < response.length; i++) {
    //   --append newResult
    $(".results").append(
      `<li><h3>${responseJson[i].fullName}</h3>
          <p></p>
      </li>`
    );
  }
}

function getResponse(query, maxResults=10, states) {
  const params = 
  { 
    key: apiKey,
    q: query,
    stateCode: states,
    maxResults
  };

  console.log(params["q"]);
  console.log(params["maxResults"]);
  console.log(params["stateCode"]);

  console.log()

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
      }
    throw new Error(response.statusText);
    })
  .then(responseJson => displayResults(responseJson))
  .catch(err => { console.log(err.message);//append as HTML to <error message>
  });
}

// function addStateCode() {
//   console.log('Executing...')
//   $('js-add-state').on("click", function() {
//     console.log('adding state...')
//     const newStateCode = $('js-state-search').val();
//     let statesList = [];
//     statesList.push(newStateCode);
//     $('js-states-list').append(`<li>${newStateCode}</li>`);
//     $('js-state-search').val('')
//   });
// };

function watchForm() {
  
  $('form').submit(event => {
    event.preventDefault();
    const searchTerms = $('.js-searchTerm').val();
    const maxResults = $('.js-maxResults').val();
    getResponse(searchTerms, maxResults, statesList)
  });
}

$(watchForm);