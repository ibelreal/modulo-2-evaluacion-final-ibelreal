/* eslint-disable no-console */
'use strict';

//HTML & constants
const btn = document.querySelector('.js-btn');
const listShows = document.querySelector('.js-list-shows');
const listFavorites = document.querySelector('.js-list-favorites');
const searcher = document.querySelector('#searcher');
let shows = [];
let showsFavorites = [];


//This function add the information of JSON to an Array
function createListshows(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].show.image === null) {
      shows[i] = {
        image: 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV',
        name: list[i].show.name
      };
    }
    else {
      shows[i] = {
        image: list[i].show.image.medium,
        name: list[i].show.name
      };
    }
  }
}

//This function paint the shows
function paintshows() {
  let htmlContent = '';
  let htmlFavorites = '';
  for (let i = 0; i < shows.length; i++) {
    const isFavorite = showsFavorites.indexOf(i) !== -1;
    if (isFavorite === true) {
      console.log('Esta es mi lista:' + showsFavorites);
      console.log('Esta es mi lista con index:' + showsFavorites.indexOf(i));
      // htmlFavorites += `<li class="shows__item" id="${[i]}">`;
      // htmlFavorites += `<div class="shows__container">`;
      // htmlFavorites += `<img class="shows__container--img"src="${shows[i].image}" title="${shows[i].name}" alt="${shows[i].name}">`;
      // htmlFavorites += `<h3 class="shows__container--name">${shows[i].name}</h3>`;
      // htmlFavorites += `</div>`;
      // htmlFavorites += `</li>`;

    }

    htmlContent += `<li class="shows__item" id="${[i]}">`;
    htmlContent += `<div class="shows__container">`;
    htmlContent += `<img class="shows__container--img"src="${shows[i].image}" title="${shows[i].name}" alt="${shows[i].name}">`;
    htmlContent += `<h3 class="shows__container--name">${shows[i].name}</h3>`;
    htmlContent += `</div>`;
    htmlContent += `</li>`;


  }
  listFavorites.innerHTML = htmlFavorites;
  listShows.innerHTML = htmlContent;
}

//This function is to check if the movie is favorite
function toggleFavorites(ev) {

  const clickedId = parseInt(ev.currentTarget.id);
  const favoriteIndex = showsFavorites.indexOf(clickedId);
  const isFavorite = favoriteIndex !== -1;

  if (isFavorite === true) {
    console.log('Lo saco');
    console.log('Favorite Index es:' + favoriteIndex + 'clicked Id es: ' + clickedId);
    //showsFavorites.splice(favoriteIndex, 1);
    //showsFavorites[showsFavorites.length];
  }
  else {
    for (let i = -1; i < showsFavorites.length; i++) {
      showsFavorites[showsFavorites.length] = {
        image: shows[clickedId].image,
        name: shows[clickedId].name,
        id: showsFavorites[showsFavorites.length]
      };
    }
    //showsFavorites.push(showsFavorites[showsFavorites.length]);
    console.log('Está metido');
    console.log('Favorite Index es:' + favoriteIndex + 'clicked Id es: ' + clickedId);
  }


  console.log('La longitud es ' + showsFavorites.length);
  console.log('Los favs son: ' + showsFavorites);
  //paintshows();
  listenshows();
}

//This function is going to listen in case you click a movie
function listenshows() {
  const showsItems = document.querySelectorAll('.shows__item');
  for (const showsItem of showsItems) {
    showsItem.addEventListener('click', toggleFavorites);
  }
}

//function of Server Data
function getServerData() {

  fetch(`https://api.tvmaze.com/search/shows?q=${searcher.value}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (getShow) {
      createListshows(getShow);
      paintshows();
      listenshows();
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