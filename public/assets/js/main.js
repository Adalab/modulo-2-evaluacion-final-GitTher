'use strict';

const submitBtn = document.querySelector('.js-submit');
const resetBtn = document.querySelector('.js-reset');
const favList = document.querySelector('.js-favourites');
const resultList = document.querySelector('.js-results');


function getAnime(event) {
    event.preventDefault()
    resultList.innerHTML = `<h2 class="results__title">Resultados:</h2>`;
    const animeInput = document.querySelector('.js-input').value;
    fetch(`https://api.jikan.moe/v3/search/anime?q=${animeInput}`)
        .then((response) => response.json())
        .then((animeData) => {
            for (let eachAnime of animeData.results) {
                console.log(eachAnime);
                if (eachAnime.image_url === 'https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620') {
                    resultList.innerHTML +=
                        ` 
<article class="results__card">
  <img
    src="https://via.placeholder.com/210x295/000000/ffffff/?text=${eachAnime.title}"
    class="results__card--img"
    alt="${eachAnime.title}"
  />
  <h3 class="results__card--title">${eachAnime.title}</h3>
</article>
`;

                } else {
                    resultList.innerHTML +=
                        ` 
                <article class="results__card">
                  <img
                    src="${eachAnime.image_url}"
                    class="results__card--img"
                    alt="${eachAnime.title}"
                  />
                  <h3 class="results__card--title">${eachAnime.title}</h3>
                </article>
              `;
                }
            }
        });
}

submitBtn.addEventListener('click', getAnime);
//# sourceMappingURL=main.js.map
