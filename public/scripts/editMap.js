const mapId = Number(window.location.pathname.split('').slice(6).join(''));
const markerArr = [];
const dbData = [];
const markDeleteIds = [];
let zoom = 5;
let map;
let mapTitle;
let userIsTrue = false;
let errorPresent = false;
let center = {};
let numDeleted = 0;
const initializeMarker = (markersJson, count) => {
  dbData.push(markersJson.id);
  // console.log(dbData);
  // console.log(typeof markersJson.latitude, markersJson.latitude);
  const marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: { lat: markersJson.latitude, lng: markersJson.longitude },
    map,
    icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%20|FE6256|000000`
  });
  // marker.addListener('click', function () {
  //   marker.setMap(null);
  //   const index = markerArr.indexOf(this);
  //   // console.log(markerArr.length);
  //   markDeleteIds.push(dbData[index]);
  //   dbData.splice(index, 1, '');
  //   // console.log(dbData);
  //   $(`#entry${index}`).remove();
  //   numDeleted++;
  //   $('.img-container').hide();
  // });

  marker.addListener('mouseover', function () {
    $.get(`/api/maps/images/${markersJson.id}`, data => {
      // console.log(data);
      $('.loc-img').attr('src', data.image_url);
      $('.img-container').show();
    });
    $(`#entry${count}`).addClass("active-marker");
    $(`#entry${count}`).find('.icon-label').addClass("active-icon");
    marker.setIcon(`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%20|1B2365|FFFFFF`);
  });
  marker.addListener('mouseout', function () {
    $.get(`/api/maps/images/${markersJson.id}`, data => {
      // console.log(data);
      $('.img-container').hide();
    });
    $(`#entry${count}`).removeClass("active-marker");
    $(`#entry${count}`).find('.icon-label').removeClass("active-icon");
    marker.setIcon(`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%20|FE6256|000000`);
  });

  markerArr.push(marker);
  formAddRowEditDisabled(markersJson);
};

function hoverHandle(map) {
  map.addListener('mousemove', (mapEvent) => {
    $('.display-gps-js').show();
    const latVal = mapEvent.latLng.toJSON().lat;
    const lngVal = mapEvent.latLng.toJSON().lng;
    $('.lat-gps').text(`lat: ${latVal.toFixed(4)}`);
    $('.lng-gps').text(`lng:${lngVal.toFixed(4)}`);
  });
  map.addListener('mouseout', (event) => {
    $('.display-gps-js').hide();
  });
}

function formAddRowEditDisabled(mJson) {
  const markCntr = $('.mark-container').children().length + 1 + numDeleted;
  const $newLat = $(`<input type="text" name='lat${markCntr - 1}' hidden>`).val(mJson.latitude);
  const $newLng = $(`<input type="text" name='lng${markCntr - 1}' hidden>`).val(mJson.longitude);
  const $newTitle = $(`<input type='text' class='m-title marker-title-input text-overflow-ellipses' disabled='disabled' name='loc_title${markCntr - 1}' placeholder='Marker Title*' value='${mJson.title}'>`);
  const $newDesc = $(`<input type='text' class='marker-input text-overflow-ellipses' disabled='disabled' name='loc_desc${markCntr - 1}' placeholder='Marker Description' value='${mJson.description}'>`);
  const $imgURL = $(`<input type='text' class='marker-input text-overflow-ellipses image-url' disabled='disabled' name='img_url${markCntr - 1}' placeholder='Marker Image URL' value='${mJson.image_url}'>`);
  const $newDiv = $(`<div id='entry${markCntr - 1}' class='group-card'>`);

  $newLat.appendTo($newDiv);
  $newLng.appendTo($newDiv);
  $newTitle.appendTo($newDiv);
  $newDesc.appendTo($newDiv);
  $imgURL.appendTo($newDiv);
  $newDiv.appendTo($('.mark-container'));
  $(':input').on('change', event => {
    $(event.target).removeClass('text-error');
    $('.err-msg').hide();
  });
  $newDiv.on('mouseover', function() {
    markerArr[markCntr - 1].setIcon(`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%20|1B2365|1B2365`);
    $newDiv.find('.icon-label').addClass("active-icon");
    $newDiv.addClass("active-marker");
    $('.loc-img').attr('src', mJson.image_url);
    $('.img-container').show();
  });
  $newDiv.on('mouseout', function() {
    markerArr[markCntr - 1].setIcon(`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%20|FE6256|FE6256`);
    $newDiv.find('.icon-label').removeClass("active-icon");
    $newDiv.removeClass("active-marker");
    $('.img-container').hide();
  });
};

function formAddRowEditEnabled(mJson) {
  const markCntr = $('.mark-container').children().length + 1 + numDeleted;
  const $newLat = $(`<input type="text" name='lat${markCntr - 1}' hidden>`).val(mJson.latitude);
  const $newLng = $(`<input type="text" name='lng${markCntr - 1}' hidden>`).val(mJson.longitude);
  const $newTitle = $(`<input type='text' class='m-title marker-title-input' name='loc_title${markCntr - 1}' placeholder='Marker Title*' value='${mJson.title}'>`);
  const $newDesc = $(`<input type='text' class='marker-input' name='loc_desc${markCntr - 1}' placeholder='Marker Description' value='${mJson.description}'>`);
  const $imgURL = $(`<input type='text' class='marker-input image-url' name='img_url${markCntr - 1}' placeholder='Marker Image URL' value='${mJson.image_url}'>`);
  const $newDiv = $(`<div id='entry${markCntr - 1}' class='group-card'>`);
  const $newLabel = $(`<label class='icon-label'>`).text(markCntr);

  $newLabel.appendTo($newDiv);
  $newLat.appendTo($newDiv);
  $newLng.appendTo($newDiv);
  $newTitle.appendTo($newDiv);
  $newDesc.appendTo($newDiv);
  $imgURL.appendTo($newDiv);
  $newDiv.appendTo($('.mark-container'));
  $(':input').on('change', event => {
    $(event.target).removeClass('text-error');
    $('.err-msg').hide();
  });

  $newDiv.on('mouseover', function() {
    markerArr[markCntr - 1].setIcon(`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markCntr}|1B2365|FFFFFF`);
    $newDiv.find('.icon-label').addClass("active-icon");
    $newDiv.addClass("active-marker");
    $('.loc-img').attr('src', mJson.image_url);
    $('.img-container').show();
  });
  $newDiv.on('mouseout', function() {
    markerArr[markCntr - 1].setIcon(`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markCntr}|FE6256|000000`);
    $newDiv.find('.icon-label').removeClass("active-icon");
    $newDiv.removeClass("active-marker");
    $('.img-container').hide();
  });
}

function initMap(center) {
  var options = {
    zoom,
    center
  };
  map = new google.maps.Map(document.getElementById('map'), options);
  hoverHandle(map);
}

function clickHandle() {
  map.addListener('click', (mapsMouseEvent) => {
    const lat = mapsMouseEvent.latLng.toJSON().lat;
    const lng = mapsMouseEvent.latLng.toJSON().lng;
    const markerNumber = $('.mark-container').children().length + 1 + numDeleted;
    const marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: { lat, lng },
      map,
      icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markerNumber}|FE6256|000000`
    });
    marker.addListener('click', function () {
      marker.setMap(null);
      let index = markerArr.indexOf(this);
      $(`#entry${index}`).remove();
      numDeleted++;
    });
    marker.addListener('mouseover', function () {
      $(`#entry${markerArr.indexOf(this)}`).addClass("active-marker");
      $(`#entry${markerArr.indexOf(this)}`).find('.icon-label').addClass("active-icon");
      marker.setIcon(`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markerNumber}|1B2365|FFFFFF`);
    });
    marker.addListener('mouseout', function () {
      $(`#entry${markerArr.indexOf(this)}`).removeClass("active-marker");
      $(`#entry${markerArr.indexOf(this)}`).find('.icon-label').removeClass("active-icon");
      marker.setIcon(`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markerNumber}|FE6256|000000`);
    });

    const markJson = {
      latitude: lat,
      longitude: lng,
      title: '',
      description: '',
      image_url: ''
    };
    markerArr.push(marker);
    formAddRowEditEnabled(markJson);
    // console.log(markerArr.length);
  });
}
function throwError(element) {
  // console.log(element.children[3].value);
  $('.err-msg').hide();
  if (element === 'MAPTITLE') {
    $.ajax({ method: 'POST', data: `map_error`, url: `/maps` })
      .fail(res => {
        // console.log(res);
        $('.err-msg').text(res.responseJSON.error).show();
        $('#map-title-js').addClass('text-error');
      });
  }
  else if (!element.children[3].value)
    $.ajax({ method: 'POST', data: `mark_error`, url: `/maps` })
      .fail(res => {
        $('.err-msg').text(res.responseJSON.error).show();
        console.log($(element.children[3])[0]);
        $(element.children[3]).addClass('text-error');
      });
  return;
}

$(document).ready(() => {
  $.get(`/api/maps/${mapId}/zoom`, data => {
    zoom = data.zoomIndex;
  }).done(() => {
    $.get(`/api/maps/${mapId}`, data => {
      console.log(data);
      center.lat = data.reduce((a, val) => a + val.latitude, 0) / data.length || 43.6532;
      center.lng = data.reduce((a, val) => a + val.longitude, 0) / data.length || -79.3832;
      initMap(center);
      $('.creator').text(data[0].username).addClass("text-overflow-ellipses");
      $('.creation-date').text(new Date(data[0].maps_date_created).toISOString().slice(0, 10).replace('T', ' '));
      return data;
    }).done(data => {
      $('#map-title-container').prepend($(`<div class="edit-title">${data[0].maps_title}</div>`));
      $('#map-title-js').val(data[0].maps_title);
      $('#map-desc-js').val(data[0].maps_description);
      console.log(data);
      if (!data[0].noMarkers) {
        data.forEach((val, index) => {
          initializeMarker(val, index);
        });
      }
    });
  });

  $('#button-edit').on('click', function (event) {
    for (const marker of markerArr) {
      marker.addListener('click', function () {
        marker.setMap(null);
        const index = markerArr.indexOf(this);
        // console.log(markerArr.length);
        markDeleteIds.push(dbData[index]);
        dbData.splice(index, 1, '');
        // console.log(dbData);
        $(`#entry${index}`).remove();
        numDeleted++;
      });
    }
    $('#map-title-js').removeAttr("disabled").removeClass("text-overflow-ellipses");
    $('#map-desc-js').removeAttr("disabled").removeClass("text-overflow-ellipses");
    $('#button-edit-tooltip').remove();
    $('#button-edit').removeClass("fa-lock").addClass("fa-lock-open");
    $('.marker-title-input').removeAttr("disabled").removeClass("text-overflow-ellipses");
    $('.marker-input').removeAttr("disabled").removeClass("text-overflow-ellipses");
    $('.button-create').removeAttr("disabled").removeClass("text-overflow-ellipses");
    clickHandle();
    $('#button-edit').off('mouseover');
    $('#button-edit').off('mouseout');
    $('#button-create').removeAttr('hidden');
  });

  $('#button-edit').on('mouseover', function (event) {
    if ($('.fa-lock')[0]) {
      $('#button-edit').removeClass("fa-lock").addClass("fa-lock-open");
    }
  });
  $('#button-edit').on('mouseout', function (event) {
    if ($('.fa-lock-open')[0]) {
      $('#button-edit').removeClass("fa-lock-open").addClass("fa-lock");
    }
  });
  $('#button-delete').on('mouseover', () => {
    $('#button-delete-tooltip').show();
    $('#button-delete').addClass('max-opacity');
  });
  $('#button-delete').on('mouseout', () => {
    $('#button-delete-tooltip').hide();
    $('#button-delete').removeClass('max-opacity');
  });
  $('#button-delete').on('click', () => {
    const maptitle = $('#map-title-js').val();
    if (window.confirm(`Click OK to delete ${maptitle}`)) {
      $.ajax({ method: 'DELETE', url: `/api/maps/${mapId}`, data: '' })
        .done((data) => {
          window.location.assign(data.url);

          // console.log(maptitle, 'deleted');
        }).fail(er => console.log(er));
    }
    else
      return;
  });
  // map_id: mapId, deleted ids: markDeleteIds
  // numNew = numTotal-numDeleted(markDeleteIds.length)
  //
  $('#lat-lngs').on('submit', function (event) {
    errorPresent = false;
    event.preventDefault();
    for (const $elem of $('.mark-container').children()) {
      if (!$($elem).children()[3].value) {
        throwError($elem);
        errorPresent = true;
      }
    }
    if ($('#map-title-js').val() === '') {
      throwError('MAPTITLE');
      errorPresent = true;
    }
    if (errorPresent)
      return;
    // const numDeleted = markDeleteIds.length;
    const formData = $(this).serialize();
    const newData = formData + `&deleted=${markDeleteIds}&og_len=${dbData.length}&og_marks=${dbData}`;
    console.log(newData);
    $.ajax({ method: 'PUT', url: `/api/maps/${mapId}`, data: newData }).done(res => {
      // console.log('success', res.url);
      window.location.assign(res.url);
    });
  });
  // $.get('/api/maps/authorize', data => {
  //   if (data.login)
  //     userIsTrue = true;
  //   else
  //     userIsTrue = false;
  // }).then();

  $.get(`/api/maps/${mapId}/fav`, data => {
    if (data.val) $('.fav-icon').addClass('fav-icon-like');
    else $('.fav-icon').addClass('fav-icon-not');
  });

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
});
