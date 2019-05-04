 
"use strict";

// const stateAbbrvList = [  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL',
//                           "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", 'MO', 'MT', 
//                           "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
//                           "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" ]

const searchURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = '43MwYCVPjSmg3YJxXEaUwf3BM9vH1RvRviKofC1P';
let statesList = []; // when state field is entered, push state code to array --statesList

function formatQueryParams(params) { //   not combining params, nedds debugging...
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function displayResults(responseJson) {
  // empty previous results
  $(".results").empty();

  // loop through results
  for (let i = 0; i < responseJson["data"].length; i++) {

    console.log("displaying results...");
    //   --append newResult
    $(".results").append(`<li>
          <h3>${responseJson["data"][i].fullName}</h3>
          <p></p>
      </li>`
    );
  }
}

function getResponse(query, max, state) {
  const params = 
  { 
    api_key: apiKey,
    q: query,
    stateCode: state,
    limit: max
  };

  console.log(`q = ${params["q"]}`);
  console.log(`limit = ${params["limit"]}`);
  console.log(`stateCodes = ${params["stateCode"]}`);

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
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

  // fetch(url)
  // .then(response => {
  //   if (response.ok) {
  //     return response.json();
  //     } else {
  //       throw new Error(response.statusText)
  //     }
  //   })
  // .then((responseJson) => {
  //   displayResults(responseJson)})
  // .catch(err => { console.log(err.message)//append as HTML to <error message>
  // })
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stateCode = $('.js-state-search').val();
    const searchTerms = $('.js-searchTerm').val();
    let maxResults = $('.js-maxResults').val();
    
    if (maxResults === undefined) {
      maxResults = 10;
    }
    getResponse(searchTerms, maxResults, stateCode);

  });
}

$(watchForm);

 