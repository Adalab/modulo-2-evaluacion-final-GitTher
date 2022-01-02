'use strict';

const submitBtn = document.querySelector('.js-submit');
const resetBtn = document.querySelector('.js-reset');
const favList = document.querySelector('.js-favourites');
const resultList = document.querySelector('.js-results');

let resultElements = [];
let favElements = [];


function getAnime(event) {
    event.preventDefault()
    const animeInput = document.querySelector('.js-input').value;
    fetch(`https://api.jikan.moe/v3/search/anime?q=${animeInput}`)
        .then(response => response.json())
        .then(animeData => {
            resultElements = animeData.results;
            renderResultList(resultElements);
        });

}

function renderResultList(resultElements) {
    resultList.innerHTML = `<h2 class="results__title">Resultados:</h2>`;
    for (let i = 0; i < resultElements.length; i++) {
        if (resultElements[i].image_url === 'https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620') {
            const resultCard = document.createElement('li');
            const resultCardImg = document.createElement('img');
            const resultCardTitle = document.createElement('h3');
            const resultCardTitleContent = document.createTextNode(resultElements[i].title);

            resultCard.appendChild(resultCardImg);
            resultCard.appendChild(resultCardTitle);
            resultCard.classList.add('results__card', 'js-card');

            resultCardImg.src = `https://via.placeholder.com/210x295/000000/ffffff/?text=${resultElements[i].title}`;
            resultCardImg.alt = resultElements[i].title;
            resultCardImg.classList.add('results__card--img');

            resultCardTitle.appendChild(resultCardTitleContent);
            resultCardTitle.classList.add('results__card--title', 'js-cardTitle');

            resultList.appendChild(resultCard);


            // resultList.innerHTML +=
            //     ` 
            //     <article class="results__card js-card">
            //     <img
            //         src="https://via.placeholder.com/210x295/000000/ffffff/?text=${resultElements[i].title}"
            //         class="results__card--img"
            //         alt="${resultElements[i].title}"
            //     />
            //     <h3 class="results__card--title js-cardTitle">${resultElements[i].title}</h3>
            //     </article>
            //     `
            //     ;

        } else {
            const resultCard = document.createElement('li');
            const resultCardImg = document.createElement('img');
            const resultCardTitle = document.createElement('h3');
            const resultCardTitleContent = document.createTextNode(resultElements[i].title);
            resultCard.appendChild(resultCardImg);
            resultCard.appendChild(resultCardTitle);
            resultCardTitle.appendChild(resultCardTitleContent);
            resultCardImg.src = resultElements[i].image_url;
            resultCardImg.alt = resultElements[i].title;
            resultCardImg.classList.add('results__card--img');
            resultCardTitle.classList.add('results__card--title', 'js-cardTitle');
            resultCard.classList.add('results__card', 'js-card');
            resultList.appendChild(resultCard);

            // resultList.innerHTML +=
            // ` 
            // <article class="results__card js-card">
            // <img
            //     src="${resultElements[i].image_url}"
            //     class="results__card--img"
            //     alt="${resultElements[i].title}"
            // />
            // <h3 class="results__card--title js-cardTitle">${resultElements[i].title}</h3>
            // </article>
            // `
            // ;
        }
        const animeCard = document.querySelectorAll('.js-card');
        for (const eachCard of animeCard) {
            eachCard.addEventListener('click', addFavourite);
        }
        compareLists();

    }
}
submitBtn.addEventListener('click', getAnime); 

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
    favList.innerHTML = `<h2 class="favourites__title">Favoritos:</h2>`;
    for (let i = 0; i < favElements.length; i++) {
        if (favElements[i].image_url === 'https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620') {
            favList.innerHTML +=
                ` 
                <article class="favourites__card js-fav favourite">
                <i class="fas fa-times favourites__card--icon js-remove"></i>
                <img
                    src="https://via.placeholder.com/210x295/000000/ffffff/?text=${favElements[i].title}"
                    class="favourites__card--img"
                    alt="${favElements[i].title}"
                />
                <h3 class="favourites__card--title">${favElements[i].title}</h3>
                </article>
                `
                ;

        } else {
            favList.innerHTML +=
                ` 
                <article class="favourites__card js-fav favourite">
                <i class="fas fa-times favourites__card--icon js-remove"></i>
                <img
                    src="${favElements[i].image_url}"
                    class="favourites__card--img"
                    alt="${favElements[i].title}"
                />
                <h3 class="favourites__card--title">${favElements[i].title}</h3>
                </article>
                `
                ;
        }
        const removeBtn = document.querySelectorAll('.js-remove');
        for (const eachBtn of removeBtn) {
            eachBtn.addEventListener('click', removeFavourite);
        }

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

favElements = JSON.parse(localStorage.getItem("favs"));
window.onload = renderFavList(favElements);

//# sourceMappingURL=main.js.map
