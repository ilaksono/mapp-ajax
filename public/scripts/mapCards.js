const addFavourites = (mapsContainer) => {
  for(const card of mapsContainer) {
    const $newDiv = $(`<div class='heart-div'>`);
    const $newHeart = $('<i class="fas fa-heart fav-icon">')
    $newHeart.appendTo($newDiv);
    $newDiv.appendTo(card);
  }
}

$(document).ready(() => {

  // $.get('/api/maps/fav')
  // addFavourites($('.map-container'));

});