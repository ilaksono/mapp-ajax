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
        return response.rows
      });
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

  const getMarkersByMapID = function(mapId) {
    const queryString = `
    SELECT latitude, longitude
    FROM markers
    WHERE map_id = $1;
    `;
    const queryParams = [mapId]
    return db.query(queryString, queryParams)
    .then(response => {
      return response.rows;
    });
  }

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
    // console.log(latArr, lngArr);
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
    SELECT contributors.*, maps.*, username, AVG(latitude) AS center_latitude, AVG(longitude) AS center_longitude
    FROM contributors
    JOIN maps ON contributors.map_id=maps.id
    JOIN markers ON markers.map_id = maps.id
    JOIN users ON users.id = maps.owner_id
    WHERE contributors.user_id = $1 AND maps.owner_id <> $1
    GROUP BY maps.id, contributors.id, users.id;
    `;
    return db.query(queryString, [userId])
      .then(response => response.rows);
  };

  const getFavouritesById = (userId) => {
    const queryString = `
    SELECT favourites.*, maps.*, username, AVG(latitude) AS center_latitude, AVG(longitude) AS center_longitude
    FROM favourites
    JOIN maps ON favourites.map_id=maps.id
    JOIN markers ON markers.map_id = maps.id
    JOIN users ON users.id = maps.owner_id
    WHERE favourites.user_id = $1
    GROUP BY maps.id, favourites.id, users.id;
    `;
    return db.query(queryString, [userId])
      .then(response => response.rows);
  };

  const getCreatedById = (userId) => {
    const queryString = `
    SELECT maps.*, username, AVG(latitude) AS center_latitude, AVG(longitude) AS center_longitude
    FROM maps
    JOIN markers ON markers.map_id = maps.id
    JOIN users ON users.id = maps.owner_id
    WHERE maps.owner_id = $1
    GROUP BY maps.id, users.id
    `;
    return db.query(queryString, [userId])
      .then(response => response.rows);
  }

  const userIsOwner = (userId, mapId) => {
    const query = `SELECT owner_id 
    FROM maps WHERE id = $1
    AND owner_id = $2;`;

    return db.query(query, [mapId, userId])
    .then(data => data.rows[0]);
  }

  return {
    fetchLatlngByIP,
    createLocationsArray,
    loadAllMaps,
    buildStaticURL,
    createUpdateArray,
    getUserById,
    getContributorById,
    getFavouritesById,
    getNumberFromStrEnd,
    getMarkersByMapID,
    getCreatedById
  };
};
