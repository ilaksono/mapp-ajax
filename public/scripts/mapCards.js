const addFavourites = (mapsContainer) => {
  for (const card of mapsContainer) {
    const $newDiv = $(`<div class='heart-div'>`);
    const $newHeart = $('<i class="fas fa-heart fav-icon">');
    $newHeart.appendTo($newDiv);
    $newDiv.appendTo(card);
  }
};
const fillHearts = id => {
  const $container = $('.all-maps-container');
  for (const child of $container.children()) {
    // const mapId = $(child).children()[1].innerText;
    // console.log($(child).children()[0].children[0].children[1].children[0]);
    const $heart = $($(child).children()[0].children[0].children[1].children[0]);
    if (id == $(child).children()[1].innerText) {
      $heart.addClass('fav-icon-like');
    }
    else {
      $heart.addClass('fav-icon-not');
    }
    $($heart).on('mouseover', function (event) {
      console.log("CLICK");
      console.log(event.target);
      const mapId = ($(event.target).parent().parent().parent().parent().children()[1].innerText);
      if ($($heart).hasClass('fav-icon-not')) {
        $.ajax({ method: 'POST', url: `/api/maps/${mapId}/fav`, data: `` })
          .done(res => {
            $($heart).removeClass('fav-icon-not')
              .addClass('fav-icon-like');
          }).fail(err => console.log(err));

      } else if ($($heart).hasClass('fav-icon-like')) {
        $.ajax({ method: 'DELETE', url: `/api/maps/${mapId}/fav`, data: `` })
          .done(res => {
            $($heart).removeClass('fav-icon-like')
              .addClass('fav-icon-not');
          }).fail(err => console.log(err));
      }
    }


    );
  };
};

const heartHandler = (event) => {
  $('.fav-icon').on('click', (event) => {
    if ($('.fav-icon').hasClass('fav-icon-not')) {
      $.ajax({ method: 'POST', url: `/api/maps/${mapId}/fav`, data: `` })
        .done(res => {
          $('.fav-icon').removeClass('fav-icon-not')
            .addClass('fav-icon-like');
        }).fail(err => console.log(err));

    } else if ($('.fav-icon').hasClass('fav-icon-like')) {
      $.ajax({ method: 'DELETE', url: `/api/maps/${mapId}/fav`, data: `` })
        .done(res => {
          $('.fav-icon').removeClass('fav-icon-like')
            .addClass('fav-icon-not');
        }).fail(err => console.log(err));
    }
  });
};


$(document).ready(() => {

  addFavourites($('.map-container'));
  $.get('/api/maps/personal/personal', (data) => {
    console.log(data);
    data.forEach(val => {
      console.log(val.map_id);
      fillHearts(val.map_id);
    });
  });



});
