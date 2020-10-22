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

INSERT INTO users (id, username, email, password) VALUES ('amarkham', 'amarkham@gmail.com', '$2b$10$maGNoKxw25NYIogbAxwiA.TG75Vr5zdnzkKoPa27XP2s07Q8GPTDa');


--
-- Data for Name: maps; Type: TABLE DATA; Schema: public; Owner: vagrant
--

INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Best Sushi Restaurants', 'my favourite places to eat sushi', 3, '2020-10-01', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Cities Wish List', 'places I would like to check out someday', 3, '2020-10-05', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Cleanest subway stations', 'only get on at these ones', 3, '2020-10-18', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Best lakes to go waterskiing', 'calm bodies of water', 3, '2020-10-20', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Really cold places', 'don''t visit without a coat', 3, '2020-10-22', false);


--
-- Data for Name: contributors; Type: TABLE DATA; Schema: public; Owner: vagrant
--

INSERT INTO contributors (user_id, map_id) VALUES (3, 11);
INSERT INTO contributors (user_id, map_id) VALUES (3, 12);
INSERT INTO contributors (user_id, map_id) VALUES (3, 13);
INSERT INTO contributors (user_id, map_id) VALUES (3, 14);
INSERT INTO contributors (user_id, map_id) VALUES (3, 15);


--
-- Name: contributors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('contributors_id_seq', 5, true);


--
-- Data for Name: favourites; Type: TABLE DATA; Schema: public; Owner: vagrant
--


--
-- Name: maps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('maps_id_seq', 5, true);


--
-- Data for Name: markers; Type: TABLE DATA; Schema: public; Owner: vagrant
--

INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (11, 43.6656759190293187, -79.4088291479165349, 'Sushi on Bloor', 'sushi on the cheap', 'https://i.imgur.com/J3t2X4Ub.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (11, 43.6576038998751201, -79.4019626928384099, 'ND Sushi', 'never been but was recommended', 'https://i.imgur.com/fp958Jnb.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (11, 43.6682835701835188, -79.3778442693764958, 'Japango', 'best east end sushi', 'https://i.imgur.com/25dh9Wpb.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (12, 35.7253588997981097, 51.4050026052225917, 'Tehran', 'capital of Iran', 'https://i.imgur.com/lVzkzpib.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (12, 30.0664831740525749, 31.2451825548405395, 'Cairo', 'capital of Egypt', 'https://i.imgur.com/NHsLeO4b.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (12, 55.7278571356004235, 37.6360574822268177, 'Moscow', 'capital of Russia', 'https://i.imgur.com/hFHVJnwb.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (13, 43.6668030999785373, -79.4036148468017444, 'Spadina-Bloor', 'why transfer here when you''re next to St George?', 'https://i.imgur.com/BVtvkrGb.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (13, 43.6456897690860899, -79.3806980529785022, 'Union Station', '... after the flood', 'https://i.imgur.com/X6hhYb.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (13, 43.6871263194282591, -79.3937523786690349, 'Yonge-St. Clair', 'I saw cute dogs here', 'https://i.imgur.com/RzHInbab.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (14, 44.5462970327893686, -78.4043437227206681, 'Sandy Lake', 'quite little lake near Buckhorn', 'https://i.imgur.com/uKnMvypb.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (14, 44.6037150532615243, -79.5091702838720806, 'Bass Lake', 'cool place', 'https://i.imgur.com/Ydm7mFub.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (15, 80.8103658324989169, -41.9282029213026775, 'Greenland', 'Wow, so cold', 'https://i.imgur.com/R10X79Vb.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (15, 72.6935303298663911, 92.7439655363865825, 'Russia', 'brrr', 'https://i.imgur.com/DDI1iwrb.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (15, 83.6525420145448493, 43.0329819649176315, 'Arctic Ocean', 'why would you go here', 'https://i.imgur.com/P1dQQITb.jpg', false);


--
-- Name: markers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('markers_id_seq', 14, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

