const markerArr = [];
const mapId = Number(window.location.pathname.split('').slice(6).join(''));
const dbData = [];
const marKDeleteIds = [];
let map;
let center = {};
let numDeleted = 0;

const initializeMarker = (markersJson, count) => {
  dbData.push(markersJson.id);
  console.log(markersJson);
  // console.log(typeof markersJson.latitude, markersJson.latitude)
  const marker = new google.maps.Marker({
    position: { lat: markersJson.latitude, lng: markersJson.longitude },
    map,
    icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${count + 1}|FE6256|000000`
  });
  marker.addListener('click', function () {
    marker.setMap(null);
    const index = markerArr.indexOf(this);
    marKDeleteIds.push(dbData[index]);
    numDeleted++;
  });
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
  const $newDiv = $(`<div id='entry${markCntr - 1}'>`);
  const $newLabel = $(`<label>`).text(markCntr);

  $newLabel.appendTo($newDiv);
  $newLat.appendTo($newDiv);
  $newLng.appendTo($newDiv);
  $newTitle.appendTo($newDiv);
  $newDesc.appendTo($newDiv);
  $imgURL.appendTo($newDiv);
  $newDiv.appendTo($('.mark-container'));

}

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
    const lng = mapsMouseEvent.latLng.toJSON().lng
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map,
      icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${$('.mark-container').children().length + 1 + numDeleted}|FE6256|000000`
    });
    marker.addListener('click', function () {
      marker.setMap(null);
      let index = markerArr.indexOf(this);
      // markerArr.splice(index, 1);
      $(`#entry${index}`).remove();
      numDeleted++;
    });
    markerArr.push(marker);

    const markJson = {
      latitude: lat,
      longitude: lng,
      title: 'new title',
      description: 'description',
      image_url: 'example.png' 
    }
    formAddRow(markJson);

  });
}

$(document).ready(() => {

  $.get(`/api/maps/${mapId}`, data => {
    console.log(data);
    center.lat = data.reduce((a, val) => a + val.latitude, 0) / data.length;
    center.lng = data.reduce((a, val) => a + val.longitude, 0) / data.length;
    initMap(center);
    return data;
  }).done(data => {
    console.log(data);
    data.forEach((val, index) => {
      initializeMarker(val, index);
    });
  });

  $('form').on('submit', function (event) {
    event.preventDefault();
    console.log(marKDeleteIds, 'delete ids');
    console.log('');

  });
});