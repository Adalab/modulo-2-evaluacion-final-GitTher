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