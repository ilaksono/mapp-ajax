# mapp by DF AM IL

A node app with jQuery/AJAX, express, and PostgresQL where users can create public maps and build a personal profile.

## Purpose

**_BEWARE:_ This application was published for learning purposes. It is _not_ intended for use in production-grade software.**

This project was created and published by DF, AM, and IL as part of our learnings at Lighthouse Labs. 

## Usage

**Deployed on GCP**
**Accessible by internet network at:**
[](insert-link-here)

## Requires/Imports

**express**
API for creating server environment and request, response CRUD methods.

**cookie-session**
Allows server to write cookie session to client's browser.

**bcrypt**
Hash passwords for user privacy.

**body-parser**
Interpret keys and values in request data sent from client into object format.

**request**
HTTP request web apis, such as ipify, ipvigilante.

**fontawesome**
various icons

**bootstrap**
multiple css element styles

**normalize**
several css applications

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm run local` command.

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session
- morgan
- pg
- request-promise-native
- chalk 
- node sass middleware

## Final Product

!["Page1"](insert image url)
!["Page2"](insert image url)


## Documentation

The following helper functions can be found in `/db/dbHelpers.js`:

* various functions

The psql migrations/seeds can be found in:

* `db/schema`
* `db/seeds` respectively.

The app router exports can be found in `/routes`:

* `login.js` uses `/login` path
* `register.js` uses `/register` path
* `logout.js` uses `/logout` path
* `maps.js` uses `/maps` path
* `users.js` uses `/users` path
* `apiMarkers.js` uses `/api/maps` path