

INSERT INTO users (username, email, password) VALUES ('master branch', 'test@test.ca', '$2b$10$pmH/vR0thGNE5LqX4F1JxeDhJ.dpOvN/s1cbyHfKMywZpOPUCp6bq');

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

INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (4, 43.7735729320042495, -79.5018768310546875, 'York', 'Shulich School of Business', 'https://www.macleans.ca/wp-content/uploads/2018/04/MACU01_ON_YORK01.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (4, 43.6629045238366587, -79.3957042694091797, 'U of T St. George', 'Rotman Commerce ', 'https://www.utoronto.ca/sites/default/files/stgeorge-campus-cover.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (4, 43.7839840896227983, -79.1873931884765625, 'U of T Sc.', 'Scarborough campus for U of T', 'https://utsc.utoronto.ca/news-events/sites/default/files/styles/large/public/image/article/farm%20banner.jpg?itok=avwrUjah', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (4, 43.657673116768251, -79.378817081451416, 'Ryerson', 'Ryerson University', 'https://www.ryerson.ca/content/dam/brand/global/images/generic/slc.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (5, 43.8892860478092999, -78.6635341481101733, 'Darlington', 'in Bowmanville', 'https://world-nuclear-news.org/BlankSiteASPX/media/WNNImported/mainimagelibrary/plants/Darlington-(OPG).jpg?ext=.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (5, 43.8135963949995428, -79.0648269653320312, 'Pickering', 'in Pickering', 'https://i2.wp.com/oshawaexpress.ca/wp/wp-content/uploads/2020/01/pickering-nuclear-plant.jpg?resize=1000%2C442', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (5, 44.3267089310858609, -81.5846642422889232, 'Bruce Power', 'in Kincardine', 'https://s32829.pcdn.co/wp-content/uploads/2020/01/Unknown-1.jpeg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (1, 48.8359728787198222, 2.32706048161157586, 'Paris', 'Paris, France', 'https://i.ytimg.com/vi/kxiyD0MQBas/maxresdefault.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (2, 57.0307034819385095, 100.154867325145631, 'Russia', 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'https://www.thoughtco.com/thmb/WvM5BDpJBR5rDzEINRPhe1FGLoo=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-11404079491-602faf31824a4f49a32d236e7c42777f.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (2, 64.0460301935165859, -19.1638442729365224, 'Iceland', 'From its medieval origins', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRu_a8xne7e35okRl813CHMI3APBJFL9QwYuw&usqp=CAU', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (2, -29.1660271928193424, 132.008030727063471, 'Australia', 'To the digital era', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjqfG374Y6bCdKpEgBzh7rZ8ZHsGHUTVs-bw&usqp=CAU', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (2, 34.3666071084992737, 134.293186977063471, 'Japan', 'The purpose of lorem ipsum is to create a natural looking block of text', 'https://upload.wikimedia.org/wikipedia/commons/5/57/Oseti.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (2, -36.8219962333733122, -63.4607192729365224, 'Argentina', 'Lorem ipsum dolor sit amet', 'https://flavorverse.com/wp-content/uploads/2017/11/Argentine-Argentinian-Foods-from-Argentina.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (3, 43.6619886724289543, -79.3796110153198242, 'Carlton Loblaws', 'Big Loblaws', 'https://thehustle.co/wp-content/uploads/2019/06/header-1.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (3, 43.8621379231457098, -79.4333124253843152, 'T & T', 'Chinese supermarket', 'https://s3-media0.fl.yelpcdn.com/bphoto/SEbeMJ1jnrC7yNuJk09AsA/o.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (3, 43.8455582466805254, -79.3534257072032574, 'Costco in Markham', 'Meaningless filler text ', 'https://thehustle.co/wp-content/uploads/2019/06/header-1.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (3, 43.9016649745571499, -79.3908119201660156, 'Costco in Richmond', ' Surge in popularity', 'https://thehustle.co/wp-content/uploads/2019/06/header-1.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (3, 43.7309178497436406, -79.45587158203125, 'Costco in York', 'Publishers bundled the text', 'https://thehustle.co/wp-content/uploads/2019/06/header-1.gif', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (1, 43.8246815874621163, -79.4364853759765452, 'Totally My House', 'I live here', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&w=1000&q=80', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (1, 50.7723594357448889, 19.1855496708413469, 'Barcelona', 'Barcelona, Spain', 'https://i0.wp.com/www.traveloffpath.com/wp-content/uploads/2020/06/florian-wehde-WBGjg0DsO_g-unsplash.jpg?resize=759%2C500&ssl=1', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (1, 43.6778045496729206, -79.624786376953125, 'Pearson Airport', 'Leaving Canada', 'https://www.ctvnews.ca/polopoly_fs/1.4435921.1597153479!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg', false);
INSERT INTO markers (map_id, latitude, longitude, title, description, image_url, deleted) VALUES (1, 42.755748194596201, 12.6669996401543372, 'Sapporo', 'Sapporo, Japan', 'https://content.r9cdn.net/rimg/dimg/eb/cf/4baa6c11-city-36215-168a0ae741b.jpg?crop=true&width=1000&height=600&xhint=1500&yhint=1005', false);


