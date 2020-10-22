const userIP = '162.245.144.188';
const defaultLatlng = { latitude: '49.27670', longitude: '-123.13000' };
const request = require('request-promise-native');
const ipify = 'https://api.ipify.org/?format=json';

module.exports = (db) => {
  const loadAllMaps = function () {
    const queryString = `
    SELECT maps.id,MAX(latitude) - MIN(latitude) as lat_spread,MAX(longitude) - MIN(longitude) as lng_spread, AVG(latitude) AS center_latitude, AVG(longitude) AS center_longitude, maps.title, maps.description, maps.date_created, users.username
    FROM maps
    JOIN markers ON map_id = maps.id
    JOIN users ON users.id = maps.owner_id
    WHERE maps.deleted = false
    GROUP BY maps.id, users.id
    ORDER BY maps.id DESC;
    `;
    const queryParams = [];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const loadAllMapMarkers = function () {
    const queryString = `
    SELECT maps.id, maps.title, maps.description, maps.date_created, users.username, markers.latitude, markers.longitude
    FROM maps
    LEFT JOIN markers ON map_id = maps.id
    JOIN users ON users.id = maps.owner_id
    WHERE maps.deleted = false
    ORDER BY maps.id DESC;
    `;
    const queryParams = [];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const convertMapMarkersToMapArray = data => {
    let latSums = {}, longSums = {};
    let latCounts = {}, longCounts = {};
    let latMax = {}, latMin = {}, longMax = {}, longMin = {};
    let loadedMaps = [];
    let id;
    for (const marker of data) {
      id = marker.id;
      if (!(id in latSums)) {
        latSums[id] = 0;
        longSums[id] = 0;
        latCounts[id] = 0;
        longCounts[id] = 0;
        latMax[id] = marker.latitude;
        latMin[id] = marker.latitude;
        longMax[id] = marker.longitude;
        longMin[id] = marker.longitude;
      } else {
        if (marker.latitude > latMax[id]) {
          latMax[id] = marker.latitude;
        }
        if (marker.latitude < latMin[id]) {
          latMin[id] = marker.latitude;
        }
        if (marker.longitude > longMax[id]) {
          longMax[id] = marker.longitude;
        }
        if (marker.longitude < longMin[id]) {
          longMin[id] = marker.longitude;
        }
      }
      latSums[id] += marker.latitude;
      longSums[id] += marker.longitude;
      latCounts[id]++;
      longCounts[id]++;
    }
    for (id in latSums) {
      const markerArray = [];
      const filteredById = data.filter((data) => data.id === Number(id));
      for (const markers of filteredById) {
        markerArray.push({ latitude: markers.latitude, longitude: markers.longitude });
      }
      const object = data.filter(obj => obj.id === Number(id));
      const title = object[0].title;
      const description = object[0].description;
      const user = object[0].username;
      const date_created = object[0].date_created;
      const center_latitude = latSums[id] / latCounts[id];
      const center_longitude = longSums[id] / longCounts[id];
      const lat_spread = latMax[id] - latMin[id];
      const long_spread = longMax[id] - longMin[id];
      const zoom = getZoomIndex(lat_spread, long_spread);
      const mapStaticURL = buildStaticURL(center_latitude, center_longitude, zoom, 220, 250, "AIzaSyAzhpPYg-ucwzqHgAPqZfYbXVnmsMazg2I", markerArray);
      console.log(mapStaticURL, title);
      loadedMaps.push({ id, title, description, user, date_created, lat_spread, long_spread, center_latitude, center_longitude, mapStaticURL });
    }
    return loadedMaps;
  };

  const getZoomIndex = (maxLatSpread, maxLongSpread) => {
    return 16 - Math.floor((((maxLatSpread ** 2 + maxLongSpread ** 2) ** 0.5) * 6) ** 0.6 + (maxLatSpread ** 2 + maxLongSpread ** 2) ** 0.07 - (((maxLatSpread ** 2 + maxLongSpread ** 2) ** 0.5) * 2) ** 0.16);
  };

  const buildStaticURL = function (lat, long, zoom, height, width, apiKey, markerArr) {
    let staticURL = `https://maps.googleapis.com/maps/api/staticmap?`;
    const center = `center=${lat},${long}`;
    const zoomParam = `&zoom=${zoom}`;
    const size = `&size=${width}x${height}`;
    let markers = ``;
    if (markerArr.length) {
      markers += `&markers=color:0xF55C5C|size:small|`;
    }
    for (let i = 0; i < markerArr.length; i++) {
      if (i === 0) {
        markers += `${markerArr[i].latitude},${markerArr[i].longitude}`;
      } else {
        markers += `|${markerArr[i].latitude},${markerArr[i].longitude}`;
      }
    }
    const key = `&key=${apiKey}`;
    return staticURL += center + zoomParam + size + markers + key;
  };

  const getMarkersByMapID = function (mapId) {
    const queryString = `
    SELECT latitude, longitude
    FROM markers
    WHERE map_id = $1;
    `;
    const queryParams = [mapId];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const fetchLatlngByIP = () => {
    return request(ipify)
      .then(body => {
        const ip = JSON.parse(body).ip;
        return request('https://ipvigilante.com/' + ip);
      });
  };
  // return defaultLatlng;

  const createLocationsArray = (datajson) => {

    const latArr = [];
    const lngArr = [];
    const titleArr = [];
    const descArr = [];
    const imgArr = [];
    for (let i = 0; i < Object.keys(datajson).length; i += 5) {
      // const index = Number(Object.keys(datajson)[i][3]);
      const index = getNumberFromStrEnd(Object.keys(datajson)[i]);
      latArr.push(Number(datajson[`lat${index}`]));
      lngArr.push(Number(datajson[`lng${index}`]));
      titleArr.push(datajson[`loc_title${index}`]);
      descArr.push(datajson[`loc_desc${index}`]);
      imgArr.push(datajson[`img_url${index}`]);
    }
    return {
      lat: latArr, lng: lngArr, title: titleArr
      , desc: descArr, img: imgArr
    };
  };
  const getNumberFromStrEnd = str => {
    const arr = [...str];
    return Number(arr.slice(3).join(''));
  };

  const createUpdateArray = (json, num) => {
    const latArr = [];
    const lngArr = [];
    const titleArr = [];
    const descArr = [];
    const imgArr = [];
    for (let i = 0; i < num; i++) {
      // const index = Number(Object.keys(json)[0][3]);
      const index = getNumberFromStrEnd(Object.keys(json)[0]);
      latArr.push(Number(json[`lat${index}`]));
      lngArr.push(Number(json[`lng${index}`]));
      titleArr.push(json[`loc_title${index}`]);
      descArr.push(json[`loc_desc${index}`]);
      imgArr.push(json[`img_url${index}`]);

      delete json[`lat${index}`];
      delete json[`lng${index}`];
      delete json[`loc_title${index}`];
      delete json[`loc_desc${index}`];
      delete json[`img_url${index}`];
    }

    return {
      latitude: latArr, longitude: lngArr, title: titleArr
      , description: descArr, image_url: imgArr
    };
  };

  const getUserById = (userId) => {
    const queryString = `
    SELECT *
    FROM users
    WHERE id = $1;
    `;
    const queryParams = [userId];
    return db.query(queryString, queryParams)
      .then(response => response.rows[0]);
  };

  const getContributorById = (userId) => {
    const queryString = `
    SELECT contributors.*, maps.id, maps.title, maps.description, maps.date_created, users.username, markers.latitude, markers.longitude
    FROM contributors
    JOIN maps ON contributors.map_id = maps.id
    LEFT JOIN markers ON markers.map_id = maps.id
    JOIN users ON users.id = maps.owner_id
    WHERE contributors.user_id = $1 AND maps.owner_id <> $1;
    `;
    return db.query(queryString, [userId])
      .then(response => response.rows);
  };

  const getFavouritesById = (userId) => {
    const queryString = `
    SELECT favourites.*, maps.id, maps.title, maps.description, maps.date_created, users.username, markers.latitude, markers.longitude
    FROM favourites
    JOIN maps ON favourites.map_id=maps.id
    LEFT JOIN markers ON markers.map_id = maps.id
    JOIN users ON users.id = maps.owner_id
    WHERE favourites.user_id = $1;
    `;
    return db.query(queryString, [userId])
      .then(response => response.rows);
  };

  const getCreatedById = (userId) => {
    const queryString = `
    SELECT maps.id, maps.title, maps.description, maps.date_created, users.username, markers.latitude, markers.longitude
    FROM maps
    LEFT JOIN markers ON markers.map_id = maps.id
    JOIN users ON users.id = maps.owner_id
    WHERE maps.owner_id = $1;
    `;
    return db.query(queryString, [userId])
      .then(response => response.rows);
  };

  const userIsOwner = (userId, mapId) => {
    const query = `SELECT owner_id
    FROM maps WHERE id = $1
    AND owner_id = $2;`;
    return db.query(query, [mapId, userId])
      .then(data => data.rows);
  };

  return {
    fetchLatlngByIP,
    createLocationsArray,
    loadAllMaps,
    convertMapMarkersToMapArray,
    loadAllMapMarkers,
    buildStaticURL,
    createUpdateArray,
    getUserById,
    getContributorById,
    getZoomIndex,
    getFavouritesById,
    getNumberFromStrEnd,
    getMarkersByMapID,
    getCreatedById,
    userIsOwner
  };
};
