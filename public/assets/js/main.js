'use strict';

/* global variables */


const submitBtn = document.querySelector('.js-submit');
const resetBtn = document.querySelector('.js-reset');
const favList = document.querySelector('.js-favourites');
const resultList = document.querySelector('.js-results');

console.log('>> Ready :)');

function getAnime(event) {
    event.preventDefault()
    const animeInput = document.querySelector('.js-input').value;
    fetch(`https://api.jikan.moe/v3/search/anime?q=${animeInput}`)
        .then((response) => response.json())
        .then((animeData) => {
            console.log(animeInput);
            console.log(animeData);
            for (let eachAnime of animeData.results) {
                console.log(eachAnime.title);
                console.log(eachAnime.image_url);
            }
        });
}

submitBtn.addEventListener('click', getAnime);
//# sourceMappingURL=main.js.map
