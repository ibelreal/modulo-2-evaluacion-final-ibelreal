/* eslint-disable no-debugger */
/* eslint-disable no-console */
'use strict';

//HTML & constants
const btn = document.querySelector('.js-btn');
const listShows = document.querySelector('.js-list-shows');
const listFavorites = document.querySelector('.js-list-favorites');
const searcher = document.querySelector('#searcher');
let shows = [];
let favoritesShows = [];


//Local storage function
function setLocalStorage() {
  localStorage.setItem('favoritesShows', JSON.stringify(favoritesShows));
}

function getLocalStorage() {
  const localStorageFavorites = JSON.parse(localStorage.getItem('favoritesShows'));
  if (localStorageFavorites !== null) {
    favoritesShows = localStorageFavorites;
    paintshows();
    showNamesFavorites();
  }
}

//This function add the information of JSON to an Array
function createListshows(list) {
  for (let i = 0; i < list.length; i++) {

    if (list[i].show.image === null) {
      shows[i] = {
        image: 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV',
        name: list[i].show.name,
        days: list[i].show.schedule.days
      };
    }
    else {
      shows[i] = {
        image: list[i].show.image.medium,
        name: list[i].show.name,
        days: list[i].show.schedule.days
      };
    }
  }
}

//This function paint the shows and favorites
function paintshows() {
  let htmlContent = '';
  let htmlFavorites = '';

  for (let i = 0; i < favoritesShows.length; i++) {
    htmlFavorites += `<li class="shows__item__fav" id="${[i]}">`;
    htmlFavorites += `<span class="close__btn"  style="cursor:pointer">&times;</span>`;
    htmlFavorites += `<div class="shows__container__fav">`;
    htmlFavorites += `<img class="shows__container__fav--img" src="${favoritesShows[i].image}" title="${favoritesShows[i].name}" alt="${favoritesShows[i].name}">`;
    htmlFavorites += `<h3 class="shows__container__fav--name">${favoritesShows[i].name}</h3>`;
    htmlFavorites += `</div>`;
    htmlFavorites += `</li>`;
  }
  for (let i = 0; i < shows.length; i++) {
    htmlContent += `<li class="shows__item" id="${[i]}">`;
    htmlContent += `<div class="shows__container"  style="cursor:pointer">`;
    htmlContent += `<img class="shows__container--img"src="${shows[i].image}" title="${shows[i].name}" alt="${shows[i].name}">`;
    htmlContent += `<h3 class="shows__container--name">${shows[i].name}</h3>`;
    htmlContent += `<p class="shows__container--days">${shows[i].days}</p>`;
    htmlContent += `</div>`;
    htmlContent += `</li>`;
  }
  listFavorites.innerHTML = htmlFavorites;
  listShows.innerHTML = htmlContent;
  listenShows();
  listenFavorites();
  showNamesFavorites();
}

//This function is to check if the show is a favorite and add or remove it
function toggleShows(ev) {
  let findFav = false;
  const clickedId = parseInt(ev.currentTarget.id);
  if (favoritesShows.length === 0) {
    favoritesShows.push({ id: 0, image: `${shows[clickedId].image}`, name: `${shows[clickedId].name}` });
  }
  else {
    for (let i = 0; i < favoritesShows.length; i++) {
      if (shows[clickedId].name === favoritesShows[i].name) {
        favoritesShows.splice(i, 1);
        findFav = true;
      }
    }
    if (findFav === false) {
      favoritesShows.push({ id: favoritesShows.length, image: `${shows[clickedId].image}`, name: `${shows[clickedId].name}` });
    }
  }
  setLocalStorage();
  paintshows();
  listenShows();
  listenFavorites();
}
//This function delete a favorite using a x
function deleteFavorites(ev) {
  const clickedIdFav = parseInt(ev.currentTarget.id);
  favoritesShows.splice(clickedIdFav, 1);
  setLocalStorage();
  paintshows();
  listenShows();
  listenFavorites();
}
function showMeFavorites(ev) {
  debugger;
  const clickedFavorite = parseInt(ev.currentTarget.id);
  console.log(favoritesShows[clickedFavorite].name);
  listenShows();
  listenFavorites();
  showNamesFavorites();
}


//This function is going to listen in case you click a show
function listenShows() {
  const showsItems = document.querySelectorAll('.shows__item');
  for (const showsItem of showsItems) {
    showsItem.addEventListener('click', toggleShows);
  }
}

function listenFavorites() {
  const showsItemsFavs = document.querySelectorAll('.close__btn');
  for (const showsItem of showsItemsFavs) {
    showsItem.addEventListener('click', deleteFavorites);
  }
}
function showNamesFavorites() {
  const showsItemsFavs = document.querySelectorAll('.shows__item__fav');
  for (const showsItem of showsItemsFavs) {
    showsItem.addEventListener('click', showMeFavorites);
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
      listenShows();
      listenFavorites();
    })
    .catch(function (err) {
      console.log('Error al traer los datos del servidor', err);
    });
}

// Handler function
function handler(e) {
  e.preventDefault();
  getServerData();
}

//To call and put Local Storage
getLocalStorage();

//Event listener of button
btn.addEventListener('click', handler);