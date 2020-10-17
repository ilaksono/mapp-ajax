module.exports = (db) => {
  const loadAllMaps = function() {
    const queryString = `
    SELECT maps.id, AVG(latitude) AS center_latitude, AVG(longitude) AS center_longitude
    FROM maps
    JOIN markers ON map_id = maps.id
    GROUP BY maps.id
    LIMIT 5;
    `;
    const queryParams = [];
    return db.query(queryString, queryParams)
    .then(response => response.rows);
  };

  const buildStaticURL = function(lat, long, zoom, height, width, apiKey) {
    let staticURL = `https://maps.googleapis.com/maps/api/staticmap?`;
    const center = `center=${lat},${long}`;
    const zoomParam = `&zoom=${zoom}`;
    const size = `&size=${width}x${height}`;
    const key = `&key=${apiKey}`;
    return staticURL += center + zoomParam + size + key;
  }

  return { loadAllMaps, buildStaticURL };
}
