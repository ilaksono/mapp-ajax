// const buildStaticURL = (json) => {
//   let staticURL = `https://maps.googleapis.com/maps/api/staticmap?`;
//   const height = 220;
//   const width = 250;
//   const lat = json.center_latitude || 43.6532;
//   const long = json.center_longitude || -79.3832;
//   let zoom;
//   if(json.lat_spread && json.lng_spread)
//     zoom = 16 - Math.floor((((json.lat_spread ** 2 + json.lng_spread ** 2) ** 0.5) * 6) ** 0.6 + (json.lat_spread ** 2 + json.lng_spread ** 2) ** 0.07 - (((json.lat_spread ** 2 + json.lng_spread ** 2) ** 0.5) * 2) ** 0.16);
//   else zoom = 20;
//   const center = `center=${lat},${long}`;
//   const zoomParam = `&zoom=${zoom * 0.6}`;
//   const size = `&size=${width}x${height}`;
//   let markers = ``;
//   // console.log(json.marks);
//   if (json.marks.length) {
//     markers += `&markers=color:0xF55C5C|size:small|`;

//     for (let i = 0; i < json.marks.length; i++) {
//       if (i === 0) {
//         markers += `${json.marks[i].latitude},${json.marks[i].longitude}`;
//       } else {
//         markers += `|${json.marks[i].latitude},${json.marks[i].longitude}`;
//       }
//     }
//   }
//   const key = `&key=AIzaSyAzhpPYg-ucwzqHgAPqZfYbXVnmsMazg2I`;
//   staticURL += center + zoomParam + size + markers + key;
//   return staticURL;
// };
//
// const renderCard = (json) => {
//   console.log(json);
//   const $newMapCard = $(`<div class='map-card'>`);
//   const $newAnchor = $(`<a href='/maps/${json.id}'>`);
//   const $mapContainer = $('<div class="map-container">');
//   const staticURL = buildStaticURL(json);

//   const $newImg = $(`<img src=${staticURL}>`);
//   const $descContainer = $(`<div class='description-container'>`);
//   const $newTitle = $(`<div class='title'>`).text(json.title);
//   const $newDesc = $(`<div class='description'>`).text(json.description);
//   const $createdCont = $(`<div class='created-container'>`);
//   const $createOwner = $(`<div class="created-owner-data">`);
//   const $createdDate = $(`<div class="created-data">`).text(`Created On: ${new Date(json.date_created).toISOString().slice(0, 10).replace('T', ' ')}`);
//   const $creator = $(`<div class="created-data">`).text(json.username);
//   // if (userId)
//   const $favCon = $(`<div class="favourited-container">`);
//   const $mapId = $(`<span class='map-id' hidden>`).text(json.id);
//   const $newDivHeart = $(`<div class='heart-div'>`);
//   const $newHeart = $('<i class="fas fa-heart fav-icon">');
//   $newHeart.on('click', function (event) {
//     const mapId = ($(event.target).parent().parent().parent().parent().parent().children()[2].innerText);
//     if ($(event.target).hasClass('fav-icon-not')) {
//       $.ajax({ method: 'POST', url: `/api/maps/${mapId}/fav`, data: `` })
//         .done(res => {
//           $(event.target).removeClass('fav-icon-not')
//             .addClass('fav-icon-like');
//         }).fail(err => console.log(err));
//     } else if ($(event.target).hasClass('fav-icon-like')) {
//       $.ajax({ method: 'DELETE', url: `/api/maps/${mapId}/fav`, data: `` })
//         .done(res => {
//           $(event.target).removeClass('fav-icon-like')
//             .addClass('fav-icon-not');
//         }).fail(err => console.log(err));
//     }
//   });

//   $createdDate.appendTo($createOwner);
//   $creator.appendTo($createOwner);
//   $createOwner.appendTo($createdCont);
//   $newTitle.appendTo($descContainer);
//   $newDesc.appendTo($descContainer);
//   $createdCont.appendTo($descContainer);
//   $newImg.appendTo($mapContainer);
//   $mapContainer.appendTo($newAnchor);
//   $newAnchor.appendTo($newMapCard);
//   $descContainer.appendTo($newMapCard);
//   $mapId.appendTo($newMapCard);
//   $newHeart.appendTo($newDivHeart);
//   $newDivHeart.appendTo($favCon);
//   $favCon.appendTo($createdCont);

//   console.log('append');
//   $newMapCard.appendTo($('#section__container'));

// };

// $('.search').on('input', (event) => {
  //   mapArr = [];
  //   if ($('#search-js').val())
  //     $('#section__container').empty();
  //   $.ajax({ method: 'POST', url: '/api/maps/search/search', data: `search=${$('#search-js').val()}` })
  //     .done(data => {
  //       data.forEach((val, index) => {
  //         mapArr.push(val);
  //         $.ajax({ method: 'POST', url: `/api/maps/search/marks`, data: `map_id=${val.id}` })
  //           .done(res => {
  //             data[index].marks = res;
  //             mapArr[index].marks = res;
  //             return data[index];
  //           }).done(data2 => renderCard(mapArr[index]))
  //           .catch(er => console.log(er));
  //       });
  //     })
  //     .done(() => {
  //       $.get('/api/maps/personal/personal', (data1) => {
  //         fillHearts(data1);
  //       }).fail(er => console.log(er));
  //     })
  //     .catch(err => console.log(err));
  // });