
function initMap() {
  const myLatlng = { lat: 42.3601, lng: -71.0589 };
  var options = {
    zoom: 8,
    center: myLatlng
  };
  const map = new google.maps.Map(document.getElementById('map'), options);
  // const marker = new google.maps.Marker({
  //   position: { lat: 42.4668, lng: -70.9495 },
  //   map: map,
  //   icon: 'http://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  // });
  clickHandle(map, myLatlng);
  // let infoWindow = new google.maps.InfoWindow({
  //   content: 'Click map to get lat/lng',
  //   position: myLatlng
  // })
  // map.addListener('click', (mapsMouseEvent) => {
  //   infoWindow.close();
  //   infoWindow = new google.maps.InfoWindow({
  //     position: mapsMouseEvent.latLng
  //   });
  //   infoWindow.setContent(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
  //   infoWindow.open(map);
  //   console.log(mapsMouseEvent.latLng.toJSON());
  // })
}
function clickHandle(map, myLatlng) {
  let infoWindow = new google.maps.InfoWindow({
    content: 'Click map to get lat/lng',
    position: myLatlng
  });

  map.addListener('click', (mapsMouseEvent) => {
    infoWindow.close();
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng
    });
    infoWindow.setContent(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
    infoWindow.open(map);
    const latVal = mapsMouseEvent.latLng.toJSON().lat;
    const lngVal = mapsMouseEvent.latLng.toJSON().lng;
    const marker = new google.maps.Marker({
      position: { lat: latVal, lng: lngVal },
      map: map,
      icon: 'http://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    });
    const markCntr = $('.mark-container').children().length + 1;
    $newLat = $(`<input type="text" name='lat${markCntr - 1}' hidden>`).val(latVal);
    $newLng = $(`<input type="text" name='lng${markCntr - 1}' hidden>`).val(lngVal);
    $newTitle = $(`<input type='text' name='loc_title${markCntr - 1}' value='title${markCntr}'>`);
    $newDesc = $(`<input type='text' name='loc_desc${markCntr - 1}' value='desc${markCntr}'>`);
    $imgURL = $(`<input type='text' name='img_url${markCntr - 1}' value='example.png'>`);
    $newDiv = $(`<div>`);
    $newLabel = $(`<label>`).text(markCntr);
    // $('#lat-lngs').append($newLat).append($newLng);
    $newLabel.appendTo($newDiv);
    $newLat.appendTo($newDiv);
    $newLng.appendTo($newDiv);
    $newTitle.appendTo($newDiv);
    $newDesc.appendTo($newDiv);
    $imgURL.appendTo($newDiv);
    $newDiv.appendTo($('.mark-container'));
    // console.log(mapsMouseEvent.latLng.toJSON());
  });
};
function throwError (element) {
  $('.err-msg').hide();
  if(element === 'MARKTITLE')
    $('.err-msg').text('Location title fields cannot be empty!').show();
  else if (element === 'MAPTITLE')
    $('.err-msg').text('Map title cannot be empty!').show();
  return  
}
$(document).ready(function () {
  $('#lat-lngs').on('submit', function (event) {
    event.preventDefault();
    for (let i = 0; i < $('.mark-container').children().length; i++) {
      if (!$(`input[name='loc_title${i}']`).val())
        return throwError('MARKTITLE');
    }
    if ($('#map-title-js').val() === '')
      return throwError('MAPTITLE');
    // console.log($(this));
    console.log($(this));
    const formData = $(this).serialize();
    console.log(formData);
    const dateCreated = new Date().toISOString().slice(0, 10).replace('T', ' ');
    const newData = formData + `&date_created=${dateCreated}`;
    console.log(newData);
    $.ajax({ method: 'POST', url: `/maps`, data: newData });
  });
});

