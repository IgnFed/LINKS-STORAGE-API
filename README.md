# LINKS STORAGE API

### Api to [ GET, POST, PUT, DELETE ] links with [NodeJS](http://www.nodejs.org) and [mongoDB](https://www.mongodb.com) ([mongoose](https://mongoosejs.com/))

If you want to use it, you need:

  1) Clone this repo
  2) <code>cd ./LINKS-STORAGE-API</code>
  3) <code>npm i</code>

Optionally
  
  4) If you don't have typescript globally then <code>npm i typescript</code>

All the dependences are without the <code>^</code>,
so tehy'll be installed with a exact version.

----
## Setting enviorment variables

You can set it with the [package.json](./package.json).

But if you prefer, also you can do it throught an .env file

The env variables that this program uses are:

  ### 1) NODE_ENV, to decide wich enviroment is running, the value can be:

  * development
  * production

  ### 2) TOKEN, used with [jwt](https://jwt.io/) when you login and need authorization

  ### 3) MONGO_URI, to use a production database with mongo
  ### 4) MONGO_URI_TEST, to use a test database with mongo
  ### 5) PORT, used when you don't send as parameter the server port in [listen method](./src/index.ts).
