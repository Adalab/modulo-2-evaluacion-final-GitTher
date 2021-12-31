
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


