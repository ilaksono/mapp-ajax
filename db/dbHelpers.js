module.exports = (db) => {
  const loadAllMaps = function() {
    const queryString = `
    SELECT *
    FROM maps
    LIMIT 5;
    `;
    const queryParams = [];
    return db.query(queryString, queryParams)
    .then(response => response.rows);
  };

  const buildStaticURL = function(lat, long, zoom, apiKey) {
    const staticURL = "https://maps.googleapis.com/maps/api/staticmap?";
    const center = `center=${lat},${long}`;
    const zoomParam = `&zoom=${zoom}`;
    const key = `&key=${apiKey}`;
    return staticURL += center + zoomParam + key;
  }

  return { loadAllMaps, buildStaticURL };
}
