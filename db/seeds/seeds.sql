INSERT INTO users (username, email, password) VALUES ('testuser1', 'test1@gmail.com', 'password');
INSERT INTO users (username, email, password) VALUES ('testuser2', 'test2@gmail.com', 'password');
INSERT INTO users (username, email, password) VALUES ('testuser3', 'test3@gmail.com', 'password');
INSERT INTO users (username, email, password) VALUES ('testuser4', 'test4@gmail.com', 'password');

INSERT INTO maps (title, description, owner_id, date_created) VALUES ('Cool Map', 'Map showing cool locations', 1, '2020-10-01');
INSERT INTO maps (title, description, owner_id, date_created) VALUES ('Food Map', 'Map showing great food', 2, '2020-10-03');
INSERT INTO maps (title, description, owner_id, date_created) VALUES ('Good Views Map', 'Map showing good views in the city', 3, '2020-10-06');
INSERT INTO maps (title, description, owner_id, date_created) VALUES ('Bathroom Map', 'Map showing public bathrooms in a city', 4, '2020-10-10');

INSERT INTO markers (map_id, latitude, longitude, title, description, image_url)
VALUES (1, 38.895321, -34.135462, 'Washington, DC','Shopper''s Drug Mart' ,'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h350'),
(2, 48.895321, -35.135469, 'Some Place','McDonald''s','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h350'),
(3, 58.893251, -47.198471, 'Somewhere','Applebee''s','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h350'),
(4, 68.893251, -12.184695, 'Some place','Golf Course','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h350');

INSERT INTO favourites (user_id, map_id) VALUES (1, 3);
INSERT INTO favourites (user_id, map_id) VALUES (2, 3);
INSERT INTO favourites (user_id, map_id) VALUES (3, 4);
INSERT INTO favourites (user_id, map_id) VALUES (4, 1);

INSERT INTO contributors (user_id, map_id) VALUES (1, 2);
INSERT INTO contributors (user_id, map_id) VALUES (1, 3);
INSERT INTO contributors (user_id, map_id) VALUES (3, 1);
INSERT INTO contributors (user_id, map_id) VALUES (2, 1);
