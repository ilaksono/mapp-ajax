SELECT *,
  CASE
    WHEN favourites.user_id = maps.owner_id THEN 'true'
    ELSE 'false'
  END AS favourited
FROM maps
JOIN favourites ON favourites.map_id = maps.id;

WHERE user_id IN (
SELECT user_id FROM favourites WHERE map_id = $1
)

SELECT maps.*
WHERE favourites.user_id IN (SELECT user_id FROM favourites WHERE map_id = $1)
AND deleted = false
AND

SELECT maps.id,MAX(latitude) - MIN(latitude) as lat_spread,MAX(longitude) - MIN(longitude) as lng_spread, AVG(latitude) AS center_latitude, AVG(longitude) AS center_longitude, maps.title, maps.description
  , CASE
    WHEN favourites.user_id IN (SELECT user_id FROM favourites WHERE map_id = $1) THEN 'true'
    ELSE 'false'
  END AS favourited_own_map
FROM maps
JOIN markers ON markers.map_id = maps.id
JOIN favourites ON favourites.user_id = $2 -> req.session.userId
GROUP BY maps.id;
