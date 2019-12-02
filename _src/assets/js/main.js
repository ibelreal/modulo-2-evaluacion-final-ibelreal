/* eslint-disable no-debugger */
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
  for (let i = 0; i < showsFavorites.length; i++) {
    htmlFavorites += `<li class="shows__item__fav" id="${[i]}">`;
    htmlFavorites += `<div class="shows__container__fav">`;
    htmlFavorites += `<img class="shows__container__fav--img" src="${showsFavorites[i].image}" title="${showsFavorites[i].name}" alt="${showsFavorites[i].name}">`;
    htmlFavorites += `<h3 class="shows__container__fav--name">${showsFavorites[i].name}</h3>`;
    htmlFavorites += `</div>`;
    htmlFavorites += `</li>`;
  }
  for (let i = 0; i < shows.length; i++) {
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
  let findFav = false;
  const clickedId = parseInt(ev.currentTarget.id);
  if (showsFavorites.length === 0) {
    showsFavorites.push({ id: 0, image: `${shows[clickedId].image}`, name: `${shows[clickedId].name}` });
    console.log('Se ha añadido en Favs 0');
  }

  else {
    for (let i = 0; i < showsFavorites.length; i++) {
      if (shows[clickedId].name === showsFavorites[i].name) {
        showsFavorites.splice(i, 1);
        console.log('Se ha eliminado: ' + i + 'Favoritos es: ' + showsFavorites);
        findFav = true;
        console.log('Ha encontrado a favorito');
      }

    }
    if (findFav === false) {
      showsFavorites.push({ id: showsFavorites.length, image: `${shows[clickedId].image}`, name: `${shows[clickedId].name}` });
      console.log('Favorito se ha añadido');
    }
  }

  console.log('La longitud es ' + showsFavorites.length);
  console.log('Los favs son: ' + showsFavorites);
  paintshows();
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