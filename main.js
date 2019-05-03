"use strict";

let username;
let url;


function buildHTML(response) {
	console.log(response[0].owner.html_url)
	for(let i = 0; i < response.length; i++) {
		$(".items")
		.append(
			`<div class="results">
				<h2>${response[i].name}</h2>
				<a  target="_blank" href=${response[i].html_url}>--Link to Repo!</a>
			</div>`);
	}
}


function displayResults(response){
	console.log(response[0].name)
	buildHTML(response);
}

function getUsername(username) {
	$(".items").empty();
	
	fetch(url)
	.then(response => {
		if (response.ok) {
			return response.json();
		} else {
			throw new Error(response.statusText);
		}
	})
	.then(responseJson => {
		console.log("displaying..")
		displayResults(responseJson)
			})
	.catch(err => {
		console.log(`Something went wrong: ${err.message}`);
		$(".items")
		.append(`<p class="error">Something went wrong: ${err.message}</p>`)
	})
};


function watchForm() {
	$(".form").submit(event => {
		console.log("Seaching.. ..");
		event.preventDefault();
		username = $(".searchTerm").val();
		url = `https://api.github.com/users/${username}/repos`;
		getUsername(username);
	})
}

$(function() {
	console.log("App is starting up..")
	watchForm();
})
