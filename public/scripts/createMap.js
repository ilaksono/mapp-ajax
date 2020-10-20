let errorPresent = false;

function initMap() {
  const myLatlng = { lat: 43.6532, lng: -79.3832 };
  var options = {
    zoom: 8,
    center: myLatlng
  };
  const map = new google.maps.Map(document.getElementById('map'), options);
  clickHandle(map);
  hoverHandle(map);
}
const markersArr = [];
const formArr = [];
let numDeleted = 0;

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

function clickHandle(map) {
  // let infoWindow = new google.maps.InfoWindow({
  //   content: 'Click map to get lat/lng',
  //   position: myLatlng
  // });

  map.addListener('click', (mapsMouseEvent) => {
    // infoWindow.close();
    // infoWindow = new google.maps.InfoWindow({
    //   position: mapsMouseEvent.latLng
    // });
    // infoWindow.setContent(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
    // infoWindow.open(map);
    const latVal = mapsMouseEvent.latLng.toJSON().lat;
    const lngVal = mapsMouseEvent.latLng.toJSON().lng;
    const markCntr = $('.mark-container').children().length + 1 + numDeleted;
    const marker = new google.maps.Marker({
      position: { lat: latVal, lng: lngVal },
      map: map,
      icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markCntr}|FE6256|000000`
    });
    const $newLat = $(`<input type="text" name='lat${markCntr - 1}' hidden>`).val(latVal);
    const $newLng = $(`<input type="text" name='lng${markCntr - 1}' hidden>`).val(lngVal);
    const $newTitle = $(`<input type='text' class='m-title marker-title-input' name='loc_title${markCntr - 1}' placeholder='Marker Title*'>`);
    const $newDesc = $(`<input type='text' class='marker-input' name='loc_desc${markCntr - 1}' placeholder='Marker Description'>`);
    const $imgURL = $(`<input type='text' class='marker-input' name='img_url${markCntr - 1}' placeholder='Marker Image URL'>`);
    const $newDiv = $(`<div id='entry${markCntr - 1}' class='group-card'>`);
    const $newLabel = $(`<label class='icon-label'>`).text(markCntr);
    // $('#lat-lngs').append($newLat).append($newLng);
    $newLabel.appendTo($newDiv);
    $newLat.appendTo($newDiv);
    $newLng.appendTo($newDiv);
    $newTitle.appendTo($newDiv);
    $newDesc.appendTo($newDiv);
    $imgURL.appendTo($newDiv);
    formArr.push($newDiv);
    $newDiv.appendTo($('.mark-container'));
    marker.addListener('click', function () {
      marker.setMap(null);
      let index = markersArr.indexOf(this);
      $(`#entry${index}`).remove();
      numDeleted++;
    });
    markersArr.push(marker);
    $(':input').on('change', event => {
      $(event.target).removeClass('text-error');
      $('.err-msg').hide();
    });
  });
};

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

$(document).ready(function () {

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
    // console.log($(this));
    const formData = $(this).serialize();
    // console.log(formData);
    const dateCreated = new Date().toISOString().slice(0, 10).replace('T', ' ');
    const newData = formData + `&date_created=${dateCreated}`;
    console.log(newData);
    $.ajax({ method: 'POST', url: `/maps`, data: newData })
      .done(res => {
        window.location.assign(res.url);
      });
  });
});

