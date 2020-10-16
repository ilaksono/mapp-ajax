INSERT INTO users (username, email, password) VALUES ('testuser1', 'test1@gmail.com', 'password');
INSERT INTO users (username, email, password) VALUES ('testuser2', 'test2@gmail.com', 'password');
INSERT INTO users (username, email, password) VALUES ('testuser3', 'test3@gmail.com', 'password');
INSERT INTO users (username, email, password) VALUES ('testuser4', 'test4@gmail.com', 'password');

INSERT INTO markers (map_id, latitude, longitude, title, description, image_url)
VALUES (1, 38.8951, -770364, 'Washington, DC','Shoppers Drug Mart','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h350'),
(2, 48.8951, -770364, 'Some Place','McDonalds','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h350'),
(3, 58.8951, -770364, 'Somewhere','Applebee''s','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h350'),
(4, 68.8951, -770364, 'Some place','Golf Course','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h350');

INSERT INTO maps (title, description) VALUES ('Cool Map', 'Map showing cool locations');
INSERT INTO maps (title, description) VALUES ('Food Map', 'Map showing great food');
INSERT INTO maps (title, description) VALUES ('Good Views Map', 'Map showing good views in the city');
INSERT INTO maps (title, description) VALUES ('Bathroom Map', 'Map showing public bathrooms in a city');

INSERT INTO favourites (user_id, map_id) VALUES (1, 3);
INSERT INTO favourites (user_id, map_id) VALUES (2, 3);
INSERT INTO favourites (user_id, map_id) VALUES (3, 4);
INSERT INTO favourites (user_id, map_id) VALUES (4, 1);

INSERT INTO contributors (user_id, map_id) VALUES (1, 2);
INSERT INTO contributors (user_id, map_id) VALUES (1, 3);
INSERT INTO contributors (user_id, map_id) VALUES (3, 1);
INSERT INTO contributors (user_id, map_id) VALUES (2, 1);
