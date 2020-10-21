const data = [ {
  id: 6,
  title: 'testtest',
  description: '',
  date_created: new Date(),
  username: 'test',
  latitude: 44.1544247572668,
  longitude: -79.7863338867187 },
 {
  id: 6,
  title: 'testtest',
  description: '',
  date_created: new Date(),
  username: 'test',
  latitude: 44.1268302405891,
  longitude: -78.9458797851562 },
 {
  id: 4,
  title: 'Bathroom Map',
  description: 'Map showing public bathrooms in a city',
  date_created: new Date(),
  username: 'testuser4',
  latitude: 68.893251,
  longitude: -12.184695 },
 {
  id: 3,
  title: 'Good Views Map',
  description: 'Map showing good views in the city',
  date_created: new Date(),
  username: 'testuser3',
  latitude: 60.3309836943142,
  longitude: -44.3887175820313 },
 {
  id: 3,
  title: 'Good Views Map',
  description: 'Map showing good views in the city',
  date_created: new Date(),
  username: 'testuser3',
  latitude: 58.893251,
  longitude: -47.198471 },
 {
  id: 2,
  title: 'Food Map',
  description: 'Map showing great food',
  date_created: new Date(),
  username: 'testuser2',
  latitude: 49.7350330137384,
  longitude: -35.0173659726562 },
 {
  id: 2,
  title: 'Food Map',
  description: 'Map showing great food',
  date_created: new Date(),
  username: 'testuser2',
  latitude: 48.895321,
  longitude: -35.135469 },
 {
  id: 1,
  title: 'Cool Map',
  description: 'Map showing cool locations',
  date_created: new Date(),
  username: 'testuser1',
  latitude: 38.895321,
  longitude: -34.135462 } ];

  const convertMapMarkersToMapArray = data => {
    let latSums = {}, longSums = {};
    let latCounts = {}, longCounts = {};
    let latMax = {}, latMin = {}, longMax = {}, longMin = {};
    let loadedMaps = [];
    const markerArray = [];
    let id;
    for (const marker of data) {
      id = marker.id;
      if(!(id in latSums)) {
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
      markerArray.push({ latitude: marker.latitude, longitude: marker.longitude });
      latSums[id] += marker.latitude;
      longSums[id] += marker.longitude;
      latCounts[id]++;
      longCounts[id]++;
    }
    for (id in latSums) {
      const object = data.filter(obj => obj.id === Number(id));
      const title = object[0].title;
      const description = object[0].description;
      const user = object[0].username;
      const date_created = object[0].date_created;
      loadedMaps.push({ id, title, description, user, date_created, lat_spread: latMax[id] - latMin[id], long_spread: longMax[id] - longMin[id], latitude: latSums[id] / latCounts[id], longitude: longSums[id] / longCounts[id] });
    }
    console.log(markerArray);
    return loadedMaps;
  };
//id: map.id, mapStaticURL, title: map.title, description: map.description, date_created: map.date_created, user: map.username
convertMapMarkersToMapArray(data);
