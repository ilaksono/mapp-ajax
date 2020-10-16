function initMap() {
  const myLatlng = { lat: 42.3601, lng: -71.0589 };
  var options = {
    zoom: 8,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map'), options);
  var marker = new google.maps.Marker({
    position: { lat: 42.4668, lng: -70.9495 },
    map: map,
    icon: 'http://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  })
  let infoWindow = new google.maps.InfoWindow({
    content: 'Click map to get lat/lng',
    position: myLatlng
  })
  map.addListener('click', (mapsMouseEvent) => {
    infoWindow.close();
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng
    });
    infoWindow.setContent(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
    infoWindow.open(map);
    console.log(mapsMouseEvent.latLng.toJSON());
  })
}
