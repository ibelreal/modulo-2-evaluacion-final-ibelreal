/* eslint-disable no-console */
'use strict';

//HTML & constants
const btn = document.querySelector('.js-btn');
const listMovies = document.querySelector('.js-list-movies');
const searcher = document.querySelector('#searcher');
let movies = [];
let moviesFavorites = [];


//This function add the information of JSON to an Array
function createListMovies(list) {
  for (let i = 0; i < list.length; i++) {

    if (list[i].show.image === null) {
      movies[i] = {
        image: 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV',
        name: list[i].show.name
      };
    }
    else {

      movies[i] = {
        image: list[i].show.image.medium,
        name: list[i].show.name
      };
    }
  }

}



//This function paint the movies
function paintMovies() {
  let htmlContent = '';

  for (let i = 0; i < movies.length; i++) {
    htmlContent += `<li class="movies__item" id="${[i]}">`;
    htmlContent += `<div class="movies__container">`;
    htmlContent += `<img class="movies__container--img"src="${movies[i].image}" title="${movies[i].name}" alt="${movies[i].name}">`;
    htmlContent += `<h3 class="movies__container--name">${movies[i].name}</h3>`;
    htmlContent += `</div>`;
    htmlContent += `</li>`;
  }
  listMovies.innerHTML = htmlContent;
  console.log(movies);

}

//function of Server Data
function getServerData() {

  fetch(`https://api.tvmaze.com/search/shows?q=${searcher.value}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (getShow) {
      createListMovies(getShow);
      paintMovies();
    })
    .catch(function (err) {
      console.log('Error al traer los datos del servidor', err);
    });
}

function handler(e) {
  e.preventDefault();
  getServerData();
}

//Event listener of button
btn.addEventListener('click', handler);