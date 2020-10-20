const addFavourites = (mapsContainer) => {
  for(const card of mapsContainer) {
    const $newDiv = $(`<div class='heart-div'>`);
    const $newHeart = $('<i class="fas fa-heart fav-icon">')
    $newHeart.appendTo($newDiv);
    $newDiv.appendTo(card);
  }
}

$(document).ready(() => {
<<<<<<< HEAD

  // $.get('/api/maps/fav')
=======
  $.get('/api/maps/fav')
>>>>>>> feature/heart-profile
  addFavourites($('.map-container'));

});
