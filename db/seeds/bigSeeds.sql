

INSERT INTO users (username, email, password) VALUES ('maps4life', 'test@test.ca', '$2b$10$pmH/vR0thGNE5LqX4F1JxeDhJ.dpOvN/s1cbyHfKMywZpOPUCp6bq');

INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Great Food and Music', 'Good vibes', 1, '2018-10-22', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Fresh Supermarkets in GTA', 'Supermarkets with fresh produce', 1, '2018-11-28', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Universities in GTA', 'Some university campuses', 1, '2018-12-20', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Ontario''s Power Stations', 'Built by OPG and operating 24/7 for over 30 years', 1, '2018-12-22', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Summer Vacation', 'My dream vacation spots', 1, '2018-12-25', false);

INSERT INTO contributors (user_id, map_id) VALUES (1, 1);
INSERT INTO contributors (user_id, map_id) VALUES (1, 2);
INSERT INTO contributors (user_id, map_id) VALUES (1, 3);
INSERT INTO contributors (user_id, map_id) VALUES (1, 4);
INSERT INTO contributors (user_id, map_id) VALUES (1, 5);

INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (1, 57.0307034819385095, 100.154867325145631, 'Russia', 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'https://www.thoughtco.com/thmb/WvM5BDpJBR5rDzEINRPhe1FGLoo=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-11404079491-602faf31824a4f49a32d236e7c42777f.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (1, 64.0460301935165859, -19.1638442729365224, 'Iceland', 'From its medieval origins', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRu_a8xne7e35okRl813CHMI3APBJFL9QwYuw&usqp=CAU', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (1, -29.1660271928193424, 132.008030727063471, 'Australia', 'To the digital era', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjqfG374Y6bCdKpEgBzh7rZ8ZHsGHUTVs-bw&usqp=CAU', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (1, 34.3666071084992737, 134.293186977063471, 'Japan', 'The purpose of lorem ipsum is to create a natural looking block of text', 'https://upload.wikimedia.org/wikipedia/commons/5/57/Oseti.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (1, -36.8219962333733122, -63.4607192729365224, 'Argentina', 'Lorem ipsum dolor sit amet', 'https://flavorverse.com/wp-content/uploads/2017/11/Argentine-Argentinian-Foods-from-Argentina.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (2, 43.6619886724289543, -79.3796110153198242, 'Carlton Loblaws', 'Big Loblaws', 'https://thehustle.co/wp-content/uploads/2019/06/header-1.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (2, 43.8621379231457098, -79.4333124253843152, 'T & T', 'Chinese supermarket', 'https://s3-media0.fl.yelpcdn.com/bphoto/SEbeMJ1jnrC7yNuJk09AsA/o.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (2, 43.8455582466805254, -79.3534257072032574, 'Costco in Markham', 'Meaningless filler text ', 'https://thehustle.co/wp-content/uploads/2019/06/header-1.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (2, 43.9016649745571499, -79.3908119201660156, 'Costco in Richmond', ' Surge in popularity', 'https://thehustle.co/wp-content/uploads/2019/06/header-1.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (2, 43.7309178497436406, -79.45587158203125, 'Costco in York', 'Publishers bundled the text', 'https://thehustle.co/wp-content/uploads/2019/06/header-1.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (3, 43.7735729320042495, -79.5018768310546875, 'York', 'Shulich School of Business', 'https://www.macleans.ca/wp-content/uploads/2018/04/MACU01_ON_YORK01.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (3, 43.6629045238366587, -79.3957042694091797, 'U of T St. George', 'Rotman Commerce ', 'https://www.utoronto.ca/sites/default/files/stgeorge-campus-cover.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (3, 43.7839840896227983, -79.1873931884765625, 'U of T Sc.', 'Scarborough campus for U of T', 'https://utsc.utoronto.ca/news-events/sites/default/files/styles/large/public/image/article/farm%20banner.jpg?itok=avwrUjah', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (3, 43.657673116768251, -79.378817081451416, 'Ryerson', 'Ryerson University', 'https://www.ryerson.ca/content/dam/brand/global/images/generic/slc.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (4, 43.8892860478092999, -78.6635341481101733, 'Darlington', 'in Bowmanville', 'https://world-nuclear-news.org/BlankSiteASPX/media/WNNImported/mainimagelibrary/plants/Darlington-(OPG).jpg?ext=.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (4, 43.8135963949995428, -79.0648269653320312, 'Pickering', 'in Pickering', 'https://i2.wp.com/oshawaexpress.ca/wp/wp-content/uploads/2020/01/pickering-nuclear-plant.jpg?resize=1000%2C442', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (4, 44.3267089310858609, -81.5846642422889232, 'Bruce Power', 'in Kincardine', 'https://s32829.pcdn.co/wp-content/uploads/2020/01/Unknown-1.jpeg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (5, 43.8246815874621163, -79.4364853759765452, 'Totally My House', 'I live here', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&w=1000&q=80', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (5, 43.6778045496729206, -79.624786376953125, 'Pearson Airport', 'Leaving Canada', 'https://www.ctvnews.ca/polopoly_fs/1.4435921.1597153479!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (5, 48.8359728787198222, 2.32706048161157586, 'Paris', 'Paris, France', 'https://i.ytimg.com/vi/kxiyD0MQBas/maxresdefault.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (5, 50.7723594357448889, 19.1855496708413469, 'Poland', 'Sausages and vodka', 'https://i0.wp.com/www.traveloffpath.com/wp-content/uploads/2020/06/florian-wehde-WBGjg0DsO_g-unsplash.jpg?resize=759%2C500&ssl=1', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (5, 42.755748194596201, 12.6669996401543372, 'Italy', 'Pasta la vista', 'https://content.r9cdn.net/rimg/dimg/eb/cf/4baa6c11-city-36215-168a0ae741b.jpg?crop=true&width=1000&height=600&xhint=1500&yhint=1005', false);

INSERT INTO users (username, email, password) VALUES ('David', 'david@maplover.com', '$2b$10$DgQO2WyqPVDZwuhy1K8SJeJEVTyEBygy.mLEINZqRbWcT955X6rxS');

INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Favourite Poutine Spots', 'My fav poutine spots in MTL', 2, '2019-10-02', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Post Covid Vacation', 'Places I want to visit after covid!', 2, '2019-10-04', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('My 2018 trip to Spain!', '1000 km drive down the east coast', 2, '2019-11-16', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Favorite Cats in MTL', 'Have you seen these cats?', 2, '2019-12-22', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Smily Face', 'It''s just a smiley face', 2, '2019-12-28', false);

INSERT INTO contributors (user_id, map_id) VALUES (2, 6);
INSERT INTO contributors (user_id, map_id) VALUES (2, 7);
INSERT INTO contributors (user_id, map_id) VALUES (2, 8);
INSERT INTO contributors (user_id, map_id) VALUES (2, 9);
INSERT INTO contributors (user_id, map_id) VALUES (2, 10);

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

INSERT INTO users (username, email, password) VALUES ('amarkham', 'amarkham@gmail.com', '$2b$10$maGNoKxw25NYIogbAxwiA.TG75Vr5zdnzkKoPa27XP2s07Q8GPTDa');

INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Best Sushi Restaurants', 'my favourite places to eat sushi', 3, '2020-10-01', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Cities Wish List', 'places I would like to check out someday', 3, '2020-10-05', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Cleanest subway stations', 'only get on at these ones', 3, '2020-10-18', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Best lakes to go waterskiing', 'calm bodies of water', 3, '2020-10-20', false);
INSERT INTO maps (title, description, owner_id, date_created, deleted) VALUES ('Really cold places', 'don''t visit without a coat', 3, '2020-10-22', false);

INSERT INTO contributors (user_id, map_id) VALUES (3, 11);
INSERT INTO contributors (user_id, map_id) VALUES (3, 12);
INSERT INTO contributors (user_id, map_id) VALUES (3, 13);
INSERT INTO contributors (user_id, map_id) VALUES (3, 14);
INSERT INTO contributors (user_id, map_id) VALUES (3, 15);

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


