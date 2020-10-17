$(document).ready(function () {
  const markerArr = [];
  const mapId = Number(window.location.pathname.split('').slice(6).join(''))
  console.log(typeof mapId, mapId);
  $.get('/')
});
