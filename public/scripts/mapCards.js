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
    const heart = child.children[1].children[2].children[1].children[0].children[0];
    $(heart).addClass('fav-icon-not');
    for (const json of jsonArr) {
      if (json.map_id == child.children[2].innerText) $(heart).addClass('fav-icon-like').removeClass('fav-icon-not');
    }
  };
};

const buildStaticURL = () => {

};
//
const renderCard = (json) => {
  const $newMapCard = $(`<div class='map-card`);
  const $newAnchor = $(`<a href=/maps/${json.id}>`);
  const $mapContainer = $('<div class="map-container"');
  const staticUrl = '';

  const newImg = $(`<img >`);
};

$(document).ready(() => {
  addFavourites($('.favourited-container'));
  $.get('/api/maps/personal/personal', (data) => {
    // console.log(data);
    fillHearts(data);
  }).fail(er => console.log(er));

  $('.fa-heart').on('click', function (event) {
    const mapId = ($(event.target).parent().parent().parent().parent().parent().children()[2].innerText);
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
    if ($('#favourites1').hasClass('sub-nav-active')) {
      $(event.target).parent().parent().parent().parent().parent().remove();
    }
  });

  // $('.search').on('input', (event) => {
  //   // console.log($('#search-js').val());
  //   $.ajax({ method: 'POST', url: '/api/maps/search/search', data: `search=${$('#search-js').val()}` })
  //     .done(data => {
  //       // forEach(data.)
  //       // console.log(data);
  //       data.forEach((val, index) => {
  //         $.ajax({ method: 'POST', url: `/api/maps/search/marks`, data: `map_id=${val.id}` })
  //         .done(res => {
  //           console.log(res, index);
  //           data.marks = res 
  //         });
  //       });
  //       // console.log(data);
  //     });
  // });
});
