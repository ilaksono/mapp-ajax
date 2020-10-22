--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.10
-- Dumped by pg_dump version 9.5.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: vagrant
--

INSERT INTO users (username, email, password) VALUES ('David', 'david@maplover.com', '$2b$10$DgQO2WyqPVDZwuhy1K8SJeJEVTyEBygy.mLEINZqRbWcT955X6rxS');


--
-- Data for Name: maps; Type: TABLE DATA; Schema: public; Owner: vagrant
--

INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Favourite Poutine Spots', 'My fav poutine spots in MTL', 2, '2019-10-02', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Post Covid Vacation', 'Places I want to visit after covid!', 2, '2019-10-04', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('My 2018 trip to Spain!', '1000 km drive down the east coast', 2, '2019-11-16', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Favorite Cats in MTL', 'Have you seen these cats?', 2, '2019-12-22', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Smily Face', 'It''s just a smiley face', 2, '2019-12-28', false);


--
-- Data for Name: contributors; Type: TABLE DATA; Schema: public; Owner: vagrant
--

INSERT INTO contributors (user_id, map_id) VALUES (2, 6);
INSERT INTO contributors (user_id, map_id) VALUES (2, 7);
INSERT INTO contributors (user_id, map_id) VALUES (2, 8);
INSERT INTO contributors (user_id, map_id) VALUES (2, 9);
INSERT INTO contributors (user_id, map_id) VALUES (2, 10);



--
-- Name: contributors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('contributors_id_seq', 5, true);


--
-- Data for Name: favourites; Type: TABLE DATA; Schema: public; Owner: vagrant
--
-- Name: maps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('maps_id_seq', 5, true);


--
-- Data for Name: markers; Type: TABLE DATA; Schema: public; Owner: vagrant
--

INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (6, 45.4808924572973368, -73.5788252777548166, 'Green Spot', 'Tasty place!', 'https://www.mtlblog.com/u/2020/04/07/c8c2f90c141cbffcd848cfbe732459c2.jpg_1200x630.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (6, 45.5251354588355639, -73.5752902032340046, 'Ma Poule Mouillée', 'Portuguese chicken on poutine!', 'https://external-preview.redd.it/WxGH5g7dUfLA0Kq4dtDbPN7SV4DI-zIuMROWC96IDCI.jpg?auto=webp&s=f77fe9ebd356b0f375d88380a67551ae112719fb', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (6, 45.5264227774881931, -73.5900698650881395, 'Chez Claudette', 'Best poutine in MTL', 'https://s3-media0.fl.yelpcdn.com/bphoto/jLi42rFbJo9JixyAbGNPqQ/l.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (7, 36.1564937345029094, 138.830499630155941, 'Japan!', 'First stop', 'https://vignette.wikia.nocookie.net/gunfamfanon/images/7/78/Gundam_00.jpg/revision/latest?cb=20121108100401', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (7, -24.6555355988428957, 133.853164112467283, 'Australia!', 'Always wanted to go', 'https://media.npr.org/assets/img/2018/12/10/roger-the-kangaroo-sanctuary-alice-springs-2_custom-e0dfceba6d2665cc8cc0daa5a57eae2bcda46ad8.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (7, 62.0301345220083391, 93.6646187855248797, 'Russia!', 'Girlfriend is from there, would love to visit!', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/1_Saint_Basils_Cathedral.jpg/220px-1_Saint_Basils_Cathedral.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (7, -35.3023940628870747, -65.0658499644751203, 'Argentina!', 'Beautiful country!', 'https://studyabroad.sit.edu/wp-content/themes/ssa-sit-2019/assets/images/program-hero/ARH-hero.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (7, 64.8896960589875675, -18.8353812144751167, 'Iceland!', 'FJORDS!', 'https://www.campingiceland.com/wp-content/uploads/2019/09/iceland-fjord-ring-road-view.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (8, 41.392574014020262, 2.14717466186760575, 'Barcelona', 'Beautiful city', 'https://cdn-image.departures.com/sites/default/files/1559596629/sagrada-familia-barcelona-BARCELONA0619.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (8, 39.480916913574994, -0.406837875085215295, 'Valencia', 'Old city', 'https://d2bgjx2gb489de.cloudfront.net/gbb-blogs/wp-content/uploads/2020/01/15165921/Aerial-panoramic-view-of-the-old-town-in-Valencia-from-Santa-Caterina-tower.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (8, 37.6218450751894551, -0.999537441521516357, 'Cartagena ', 'Beautiful port city', 'https://love2fly.iberia.com/wp-content/uploads/2019/06/L2F-Jun-19-pic-Spain-Murcia-Cartagena-overview-with-Roman-theatre-iStock-579231798.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (8, 37.1718355800574329, -3.6056179810165756, 'Granada', 'Great food! ', 'https://expertvagabond.com/wp-content/uploads/granada-spain-highlights-guide.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (8, 36.7240541774959226, -4.43508575445407516, 'Malaga', 'Amazing beaches', 'https://i.pinimg.com/originals/b5/c4/36/b5c436f81b039c28b5b1222954a0386c.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (9, 45.4537346404228302, -73.5714788775079285, 'Cat', 'awww', 'https://media2.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (9, 45.5200458596795769, -73.5733671526544128, 'Cat', ':O', 'https://i.pinimg.com/originals/66/9a/78/669a787e739c53fd56e39159b2fa5c9e.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (9, 45.4407256733263623, -73.6752106880332036, 'Cat', ':P', 'https://media4.giphy.com/media/dz1iM8gU3RhzQy2MC7/giphy-downsized-large.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (9, 45.4731371301725815, -73.6089493965292974, 'Cat', ':O', 'https://media1.giphy.com/media/VgOODy0U7ywWVd7wx0/200.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (10, 50.9877836727057812, -76.3366973154899853, '1', '', '', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (10, 51.1534648203155697, -70.7776152842399853, '2', '', '', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (10, 48.6637105285380471, -77.9846465342399853, '3', '', '', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (10, 47.8297049141430932, -76.3366973154899853, '5', '', '', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (10, 48.2118155988163153, -77.6550566904899853, '4', '', '', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (10, 47.637586976794644, -75.3699004404899853, '6', '', '', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (10, 47.7854329123669288, -73.6560332529899853, '7', '', '', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (10, 48.6056273269238588, -70.6677520029899853, '10', '', '', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (10, 47.9475791240502716, -72.2497832529899853, '8', '', '', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (10, 49.0972045907643491, -70.0964629404899853, '11', '', '', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (10, 48.328818528390542, -71.0852324717399853, '9', '', '', false);


--
-- Name: markers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('markers_id_seq', 28, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

