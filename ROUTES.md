## Users ##
* GET /users/:id -> username, email, maps (favourite and contributed to)
* GET /users/:id/maps/:id
* POST /login -> user login => server => user database
* POST /register  -> creates entry in user database
* GET /login -> loads login page
* GET /register -> loads register page
* POST /logout -> logs a user out

## Maps ##
* GET /maps -> loads all the maps -> button 
* POST /maps -> creates new map in map database -> BUTTON 
* GET /maps/:id -> view select map
* PUT /maps/:id -> modify/edit select maps -> SUBMIT? OR AJAX
* DELETE /maps/:id -> delete select map
* POST /maps/:id/fav
* GET /maps/:id/new -> template to make a new map

