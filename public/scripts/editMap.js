const mapId = Number(window.location.pathname.split('').slice(6).join(''));
const markerArr = [];
const dbData = [];
const markDeleteIds = [];
let map;
let center = {};
let numDeleted = 0;
const initializeMarker = (markersJson, count) => {
  dbData.push(markersJson.id);
  // console.log(dbData);
  // console.log(typeof markersJson.latitude, markersJson.latitude)
  const marker = new google.maps.Marker({
    position: { lat: markersJson.latitude, lng: markersJson.longitude },
    map,
    icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${count + 1}|FE6256|000000`
  });
  marker.addListener('click', function () {
    marker.setMap(null);
    const index = markerArr.indexOf(this);
    // console.log(markerArr.length);
    markDeleteIds.push(dbData[index]);
    dbData.splice(index, 1, '');
    // console.log(dbData);
    $(`#entry${index}`).remove();
    numDeleted++;
    $('.img-container').hide();
  });
  marker.addListener('mouseover', function() {
    $.get(`/api/maps/images/${markersJson.id}`, data => {
      console.log(data);
      $('.img-container').show();
      $('.loc-img').attr('src', data.image_url);
    });
  })
  marker.addListener('mouseout', function() {
    $.get(`/api/maps/images/${markersJson.id}`, data => {
      // console.log(data);
      $('.img-container').hide();
    });
  })

  formAddRow(markersJson);
  markerArr.push(marker);
};

function formAddRow(mJson) {

  const markCntr = $('.mark-container').children().length + 1 + numDeleted;
  const $newLat = $(`<input type="text" name='lat${markCntr - 1}' hidden>`).val(mJson.latitude);
  const $newLng = $(`<input type="text" name='lng${markCntr - 1}' hidden>`).val(mJson.longitude);
  const $newTitle = $(`<input type='text' name='loc_title${markCntr - 1}' value='${mJson.title}'>`);
  const $newDesc = $(`<input type='text' name='loc_desc${markCntr - 1}' value='${mJson.description}'>`);
  const $imgURL = $(`<input type='text' name='img_url${markCntr - 1}' value='${mJson.image_url}'>`);
  const $newDiv = $(`<div id='entry${markCntr - 1}' class='group-card'>`);
  const $newLabel = $(`<label class='icon-label'>`).text(markCntr);

  $newLabel.appendTo($newDiv);
  $newLat.appendTo($newDiv);
  $newLng.appendTo($newDiv);
  $newTitle.appendTo($newDiv);
  $newDesc.appendTo($newDiv);
  $imgURL.appendTo($newDiv);
  $newDiv.appendTo($('.mark-container'));

};

function initMap(center) {
  var options = {
    zoom: 8,
    center
  };
  map = new google.maps.Map(document.getElementById('map'), options);
  clickHandle();
}

function clickHandle() {
  map.addListener('click', (mapsMouseEvent) => {
    const lat = mapsMouseEvent.latLng.toJSON().lat;
    const lng = mapsMouseEvent.latLng.toJSON().lng;
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map,
      icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${$('.mark-container').children().length + 1 + numDeleted}|FE6256|000000`
    });
    marker.addListener('click', function () {
      marker.setMap(null);
      let index = markerArr.indexOf(this);
      $(`#entry${index}`).remove();
      numDeleted++;
    });

    const markJson = {
      latitude: lat,
      longitude: lng,
      title: 'new title',
      description: 'description',
      image_url: 'example.png'
    };
    formAddRow(markJson);
    markerArr.push(marker);
    console.log(markerArr.length);
  });
}

$(document).ready(() => {

  $.get(`/api/maps/${mapId}`, data => {
    // console.log(data);
    center.lat = data.reduce((a, val) => a + val.latitude, 0) / data.length;
    center.lng = data.reduce((a, val) => a + val.longitude, 0) / data.length;
    initMap(center);
    $('.creator').text(data[0].username);
    return data;
  }).done(data => {
    $('#map-title-js').val(data[0].maps_title);
    $('.map-desc-js').val(data[0].maps_description);
    data.forEach((val, index) => {
      initializeMarker(val, index);
    });
  });

  // map_id: mapId, deleted ids: markDeleteIds
  // numNew = numTotal-numDeleted(markDeleteIds.length)
  //  
  $('#lat-lngs').on('submit', function (event) {
    event.preventDefault();
    const numDeleted = markDeleteIds.length;
    const formData = $(this).serialize();
    const newData = formData + `&deleted=${markDeleteIds}&og_len=${dbData.length}&og_marks=${dbData}`;
    console.log(newData);
    $.ajax({ method: 'PUT', url: `/api/maps/${mapId}`, data: newData }).done(res => {
      // console.log('success', res.url);
      window.location.assign(res.url);
    });
  });

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