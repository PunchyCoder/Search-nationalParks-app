  
"use strict";

// -- -- --GLOBAL VARIABLES-- -- --
const state_Codes = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const searchURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = '43MwYCVPjSmg3YJxXEaUwf3BM9vH1RvRviKofC1P';
let stateList = [];

function formatQueryParams(params) { 
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function displayResults(responseJson) {
  $(".results").empty();
  $(".results").append(`<h2 style="color:orange;">Search Results</h2>`);

  for (let i = 0; i < responseJson["data"].length-1; i++) {

    $(".results").append(`<li>
          <h3>${responseJson["data"][i].fullName}, ${responseJson["data"][i].states} </h3>
          <p>${responseJson["data"][i].description}</p>
          <a href="${responseJson["data"][i].url}" target="_blank">Visit Website</a>
      </li>`
    );
  }
}

function getResponse(query, max, stateList) {
  const params = 
  { 
    api_key: apiKey,
    q: query,
    stateCode: stateList,
    limit: max
  };

  console.log(`q = ${params["q"]}`); // console.log
  console.log(`limit = ${params["limit"]}`); // console.log
  console.log(`stateCodes = ${params["stateCode"]}`); // console.log

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url); // console.log

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
}

function addStates(state) {
  stateList.push(state);
  $('.state-pills').append(`<p class="pill">${state}</p>`);
  $('.js-state-search').val('');
  return stateList;
}

function checkStateList(state) {
  if (state_Codes.includes(state) && !stateList.includes(state)) {
    addStates(state);
  } else{console.log(false)
    // error: state already in List!
    $('.js-state-search').val('');
    $(".js-state-error").fadeIn(100);
    $(".js-state-error").fadeOut(4000);
  };
}

function watchForm() {
  $('.js-add-state-btn').on("click", (e) => {
    const state = $('.js-state-search').val().toUpperCase();
    checkStateList(state);
  })
  $('form').submit(event => {
    console.log(stateList) // console.log
    event.preventDefault();
    const stateCode = $('.js-state-search').val();
    const searchTerms = $('.js-searchTerm').val();
    let maxResults = $('.js-maxResults').val();
    if (maxResults == '') {
      maxResults = 10;
    }
    getResponse(searchTerms, maxResults, stateList);
  });
}

$(watchForm);

 
