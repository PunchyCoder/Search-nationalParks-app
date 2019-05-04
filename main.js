  
"use strict";

// -- -- --GLOBAL VARIABLES-- -- --
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
  $(".results").append(`<h2 style="color:orange;">Search Results</h2>`);

  // loop through results
  for (let i = 0; i < responseJson["data"].length-1; i++) {

    console.log("displaying results...");
    //   --append newResult
    $(".results").append(`<li>
          <h3>${responseJson["data"][i].fullName}, ${responseJson["data"][i].states} </h3>
          <p>${responseJson["data"][i].description}</p>
          <a href="${responseJson["data"][i].url}" target="_blank">Visit Website</a>
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
    console.log(maxResults)
    if (maxResults == '') {
      maxResults = 10;
    }
    console.log(maxResults)
    getResponse(searchTerms, maxResults, stateCode);

  });
}

$(watchForm);

 