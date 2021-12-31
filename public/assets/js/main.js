'use strict';

const submitBtn = document.querySelector('.js-submit');
const resetBtn = document.querySelector('.js-reset');
const favList = document.querySelector('.js-favourites');
const resultList = document.querySelector('.js-results');

let resultElements = [];
let favElements = [];

function getAnime(event) {
    event.preventDefault()
    resultList.innerHTML = `<h2 class="results__title">Resultados:</h2>`;
    const animeInput = document.querySelector('.js-input').value;
    fetch(`https://api.jikan.moe/v3/search/anime?q=${animeInput}`)
        .then(response => response.json())
        .then(animeData => {
            resultElements = animeData.results;
            renderResultList(resultElements);
        });

}

function renderResultList(resultElements) {
    for (let i = 0; i < resultElements.length; i++) {
        if (resultElements[i].image_url === 'https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620') {
            resultList.innerHTML +=
                ` 
                <article class="results__card js-card">
                <img
                    src="https://via.placeholder.com/210x295/000000/ffffff/?text=${resultElements[i].title}"
                    class="results__card--img"
                    alt="${resultElements[i].title}"
                />
                <h3 class="results__card--title">${resultElements[i].title}</h3>
                </article>
                `
                ;

        } else {
            resultList.innerHTML +=
                ` 
                <article class="results__card js-card">
                <img
                    src="${resultElements[i].image_url}"
                    class="results__card--img"
                    alt="${resultElements[i].title}"
                />
                <h3 class="results__card--title">${resultElements[i].title}</h3>
                </article>
                `
                ;
        }
        const animeCard = document.querySelectorAll('.js-card');
        for (const eachCard of animeCard) {
            eachCard.addEventListener('click', addFavourite);
        }

    }
    // for (let eachAnime of resultElements) {
    //     if (eachAnime.image_url === 'https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620') {
    //         resultList.innerHTML +=
    //             ` 
    //             <article class="results__card js-card">
    //             <img
    //                 src="https://via.placeholder.com/210x295/000000/ffffff/?text=${eachAnime.title}"
    //                 class="results__card--img"
    //                 alt="${eachAnime.title}"
    //             />
    //             <h3 class="results__card--title">${eachAnime.title}</h3>
    //             </article>
    //             `
    //             ;

    //     } else {
    //         resultList.innerHTML +=
    //             ` 
    //             <article class="results__card js-card">
    //             <img
    //                 src="${eachAnime.image_url}"
    //                 class="results__card--img"
    //                 alt="${eachAnime.title}"
    //             />
    //             <h3 class="results__card--title">${eachAnime.title}</h3>
    //             </article>
    //             `
    //             ;
    //     }
    //     const animeCard = document.querySelectorAll('.js-card');
    //     for (const eachCard of animeCard) {
    //         eachCard.addEventListener('click', addFavourite);
    //     }

    // }
}
submitBtn.addEventListener('click', getAnime); 

function addFavourite(event) {
    const animeInfo = event.currentTarget.querySelector('.results__card--img');
    if (event.currentTarget.classList.contains('favourite')) {
        let index = favElements.findIndex(i => i.title === animeInfo.alt);
        favElements.splice(index, 1);
        console.log(favElements);
        event.currentTarget.classList.remove('favourite');
    } else {

        const newFavourite = {
            title: animeInfo.alt,
            image: animeInfo.src,
        }
        favElements.push(newFavourite);
        console.log(favElements);
        event.currentTarget.classList.add('favourite');
    }
}



//# sourceMappingURL=main.js.map
