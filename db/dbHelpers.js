const userIP = '162.245.144.188';
const defaultLatlng = { latitude: '49.27670', longitude: '-123.13000' };

module.exports = (db) => {
  const loadAllMaps = function () {
    const queryString = `
    SELECT maps.id, AVG(latitude) AS center_latitude, AVG(longitude) AS center_longitude, maps.title, maps.description
    FROM maps
    JOIN markers ON map_id = maps.id
    GROUP BY maps.id
    LIMIT 5;
    `;
    const queryParams = [];
    return db.query(queryString, queryParams)
      .then(response => response.rows);
  };

  const buildStaticURL = function (lat, long, zoom, height, width, apiKey) {
    let staticURL = `https://maps.googleapis.com/maps/api/staticmap?`;
    const center = `center=${lat},${long}`;
    const zoomParam = `&zoom=${zoom}`;
    const size = `&size=${width}x${height}`;
    const key = `&key=${apiKey}`;
    return staticURL += center + zoomParam + size + key;
  };

  const fetchLatlngByIP = () => {
    return defaultLatlng;
  };
  const createLocationsArray = (datajson) => {

    const latArr = [];
    const lngArr = [];
    const titleArr = [];
    const descArr = [];
    const imgArr = [];
    for (let i = 0; i < Object.keys(datajson).length; i += 5) {
      const index = Math.floor(i / 5);
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

  return {
    fetchLatlngByIP,
    createLocationsArray,
    loadAllMaps,
    buildStaticURL
  };
};
