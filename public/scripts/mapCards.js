const addFavourites = (mapsContainer) => {
  for (const card of mapsContainer) {
    const $newDiv = $(`<div class='heart-div'>`);
    const $newHeart = $('<i class="fas fa-heart fav-icon">');
    $newHeart.appendTo($newDiv);
    $newDiv.appendTo(card);
  }
};

const fillHearts = jsonArr => {
  const $container = $('.section-container');
  for (const child of $($container).children()) {
    const $heart = child.children[0].children[1].children[2].children[1].children[0].children[0];
    // console.log($heart);
    // console.log(child.children[1].innerText);
    $($heart).addClass('fav-icon-not');
    for (const json of jsonArr) {
      if (json.map_id == child.children[1].innerText) {
        $($heart).removeClass('fav-icon-not').addClass('fav-icon-like');
        break;
      }
    }
    $($heart).on('mouseover', function (event) {
      console.log("CLICK");
      console.log(event.target);
      const mapId = ($(event.target).parent().parent().parent().parent().parent().parent().children()[1].innerText);
      // console.log(mapId);
      if ($(event.target).hasClass('fav-icon-not')) {
        $.ajax({ method: 'POST', url: `/api/maps/${mapId}/fav`, data: `` })
          .done(res => {
            $(event.target).removeClass('fav-icon-not')
              .addClass('fav-icon-like');
          }).fail(err => console.log(err));
      } else if ($(event.target).hasClass('fav-icon-like')) {
        $.ajax({ method: 'DELETE', url: `/api/maps/${mapId}/fav`, data: `` })
          .done(res => {
            $(event.target).removeClass('fav-icon-like')
              .addClass('fav-icon-not');
          }).fail(err => console.log(err));
      }
    });
  };
};

$(document).ready(() => {
  addFavourites($('.favourited-container'));
  $.get('/api/maps/personal/personal', (data) => {
    console.log(data);
    fillHearts(data);
  }).fail(er => console.log(er));

});
