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

$(document).ready(() => {
  addFavourites($('.favourited-container'));
  $.get('/api/maps/personal/personal', (data) => {
    fillHearts(data);
  }).fail(er => console.log(er));

  $('.page-container').on('click', '.fa-heart', function (event) {
    const mapId = ($(event.target).parent().parent().parent().parent().parent().children()[2].innerText);

    //initializes which "Your Maps", "Favourites", or "Contributed To" container we are in
    let activeContainer = $();
    let inactiveContainer1 = $();
    let inactiveContainer2 = $();
    if ($('#created1').hasClass("sub-nav-active")) {
      activeContainer = $('#created2');
      inactiveContainer1 = $('#favourites2');
      inactiveContainer2 = $('#contributed2');
    } else if ($('#favourites1').hasClass("sub-nav-active")) {
      activeContainer = $('#favourites2');
      inactiveContainer1 = $('#created2');
      inactiveContainer2 = $('#contributed2');
    } else {
      activeContainer = $('#contributed2');
      inactiveContainer1 = $('#favourites2');
      inactiveContainer2 = $('#created2');
    }

    // changes heart liked or not in other containers for the same map
    for (const child of $(inactiveContainer1).children().children()) {
      const heart = child.children[1].children[2].children[1].children[0].children[0];
      const childMapId = child.children[2].innerText;
      if (childMapId === mapId) {
        if ($(event.target).hasClass('fav-icon-not')) {
          $(heart).addClass('fav-icon-like').removeClass('fav-icon-not');
        } else if ($(event.target).hasClass('fav-icon-like')) {
          $(heart).addClass('fav-icon-not').removeClass('fav-icon-like');
        }
      }
    }
    for (const child of $(inactiveContainer2).children().children()) {
      const heart = child.children[1].children[2].children[1].children[0].children[0];
      const childMapId = child.children[2].innerText;
      if (childMapId === mapId) {
        if ($(event.target).hasClass('fav-icon-not')) {
          $(heart).addClass('fav-icon-like').removeClass('fav-icon-not');
        } else if ($(event.target).hasClass('fav-icon-like')) {
          $(heart).addClass('fav-icon-not').removeClass('fav-icon-like');
        }
      }
    }

    // removes or adds the map from favourites
    if ($(event.target).hasClass('fav-icon-like')) {
      for (const child of $('#favourites2').children().children()) {
        const childMapId = child.children[2].innerText;
        const heart = child.children[1].children[2].children[1].children[0].children[0];
        if (childMapId === mapId) {
          $(heart).parent().parent().parent().parent().parent().remove();
        }
      }
    }
    if ($(event.target).hasClass('fav-icon-not')) {
      const mapCard = $(event.target).parent().parent().parent().parent().parent();
      const mapCardCopy = $(mapCard).clone();
      $(mapCardCopy).find('.fa-heart').addClass('fav-icon-like').removeClass('fav-icon-not');
      console.log(mapCardCopy[0]);
      const favouriteContainer = $('#favourites2').children();
      $(mapCardCopy).appendTo($(favouriteContainer));
    }

    // ajax to affect database
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

    /*
        if ($(event.target).hasClass('fav-icon-not')) {
    
        const $container = $('.section-container');
        for (const child of $($container).children()) {
          const title = child.children[1].children[0].innerText.toLowerCase();
          const description = child.children[1].children[1].innerText.toLowerCase();
          if (title.includes(event.target.value.toLowerCase()) || description.includes(event.target.value.toLowerCase())) {
            $(child).first().attr("hidden", false);
          } else {
            $(child).first().attr("hidden", true);
          }
        } */
  });
});
