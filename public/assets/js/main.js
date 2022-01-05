'use strict';

const animeInput = document.querySelector('.js-input');
const submitBtn = document.querySelector('.js-submit');
const resetBtn = document.querySelector('.js-reset');
const favList = document.querySelector('.js-favourites');
const resultList = document.querySelector('.js-results');

let resultElements = [];
let favElements = [];


function checkInput() {
    if (animeInput.value.length == 0) {
        animeInput.classList.add('empty');
    } else {
        animeInput.classList.remove('empty');
        return (true);
    }
}

function getAnime(event) {
    event.preventDefault()
    checkInput();
    if (checkInput() === true) {
        fetch(`https://api.jikan.moe/v3/search/anime?q=${animeInput.value}`)
            .then(response => response.json())
            .then(animeData => {
                resultElements = animeData.results;
                renderResultList(resultElements);
            });
    }

}

function renderResultList(resultElements) {
    resultList.innerHTML = '';
    for (let i = 0; i < resultElements.length; i++) {
        const resultCard = document.createElement('li');
        const resultCardImg = document.createElement('img');
        const resultCardTitle = document.createElement('h3');
        const resultCardTitleContent = document.createTextNode(resultElements[i].title);

        resultCard.appendChild(resultCardImg);
        resultCard.appendChild(resultCardTitle);
        resultCard.classList.add('results__card', 'js-card');

        resultCardImg.alt = resultElements[i].title;
        resultCardImg.classList.add('results__card--img');

        resultCardTitle.appendChild(resultCardTitleContent);
        resultCardTitle.classList.add('results__card--title', 'js-cardTitle');

        resultList.appendChild(resultCard);

        if (resultElements[i].image_url === 'https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620') {
            resultCardImg.src = `https://via.placeholder.com/210x295/bbe1fa/0f4c75/?text=${resultElements[i].title}`;
        } else if (resultElements[i].image_url === '') {
            resultCardImg.src = `https://via.placeholder.com/210x295/bbe1fa/0f4c75/?text=${resultElements[i].title}`;
        } else {
            resultCardImg.src = resultElements[i].image_url;
        }

        if (resultElements[i].airing == true) {
            const moreInfo = document.createElement('a');
            const moreInfoText = document.createTextNode('Mas información');
            moreInfo.appendChild(moreInfoText);
            moreInfo.href = resultElements[i].url;
            resultCardTitle.appendChild(moreInfo);
        } else {
            const notAiring = document.createElement('p');
            const notAiringText = document.createTextNode('No se está emitiendo');
            notAiring.appendChild(notAiringText);
            resultCardTitle.appendChild(notAiring);
        }

        const animeCard = document.querySelectorAll('.js-card');
        for (const eachCard of animeCard) {
            eachCard.addEventListener('click', addFavourite);
        }

        compareLists();

    }
}
submitBtn.addEventListener('click', getAnime);
animeInput.addEventListener('keyup', checkInput);

function addFavourite(event) {
    const animeInfo = event.currentTarget.querySelector('.results__card--img');
    if (event.currentTarget.classList.contains('favourite')) {
        let index = favElements.findIndex(i => i.title === animeInfo.alt);
        favElements.splice(index, 1);
        event.currentTarget.classList.remove('favourite');
    } else {
        const newFavourite = {
            title: animeInfo.alt,
            image_url: animeInfo.src,
        }
        favElements.push(newFavourite);
        event.currentTarget.classList.add('favourite');
    }
    renderFavList(favElements);
}

function renderFavList(favElements) {
    favList.innerHTML = '';
    for (let i = 0; i < favElements.length; i++) {
        const favCard = document.createElement('li');
        const favCardIcon = document.createElement('i');
        const favCardImg = document.createElement('img');
        const favCardTitle = document.createElement('h3');
        const favCardTitleContent = document.createTextNode(favElements[i].title);

        favCard.appendChild(favCardIcon);
        favCard.appendChild(favCardImg);
        favCard.appendChild(favCardTitle);
        favCard.classList.add('favourites__card', 'js-fav');

        favCardIcon.classList.add('fas', 'fa-times', 'favourites__card--icon', 'js-remove');

        favCardImg.alt = favElements[i].title;
        favCardImg.classList.add('favourites__card--img');

        favCardTitle.appendChild(favCardTitleContent);
        favCardTitle.classList.add('favourites__card--title');

        favList.appendChild(favCard);

        if (favElements[i].image_url === 'https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620') {
            favCardImg.src = `https://via.placeholder.com/210x295/bbe1fa/0f4c75/?text=${favElements[i].title}`;
        } else if (favElements[i].image_url === '') {
            favCardImg.src = `https://via.placeholder.com/210x295/bbe1fa/0f4c75/?text=${favElements[i].title}`;
        } else {
            favCardImg.src = favElements[i].image_url;
        }
        favCard.addEventListener('click', renderTitleConsole);
        function renderTitleConsole() {
            console.log(favElements[i].title);
        }
    }

    const removeBtn = document.querySelectorAll('.js-remove');
    for (const eachBtn of removeBtn) {
        eachBtn.addEventListener('click', removeFavourite);
    }
    localStorage.setItem("favs", JSON.stringify(favElements));
}

function removeFavourite(event) {
    const favCard = event.currentTarget.parentElement;
    const favInfo = favCard.querySelector('.favourites__card--img').alt;
    let index = favElements.findIndex(i => i.title === favInfo);
    favElements.splice(index, 1);
    event.currentTarget.classList.remove('favourite');
    renderFavList(favElements);
    compareLists();
}

function compareLists() {
    const resultTitles = document.querySelectorAll('.js-cardTitle');
    for (const eachTitle of resultTitles) {
        if (favElements.some(i => i.title === eachTitle.innerHTML)) {
            eachTitle.parentElement.classList.add('favourite');
        } else {
            eachTitle.parentElement.classList.remove('favourite');
        }
    }
}

function resetFavs(event) {
    event.preventDefault()
    favElements = [];
    renderFavList(favElements);
    compareLists();
}

resetBtn.addEventListener('click', resetFavs);
if (localStorage.getItem("favs") !== null) {
    favElements = JSON.parse(localStorage.getItem("favs"));
}

window.onload = renderFavList(favElements);

//# sourceMappingURL=main.js.map
