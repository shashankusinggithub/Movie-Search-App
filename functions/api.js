require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const path = require('path');

// database connection
const connection = require('../db');
connection();

// all Routs
const userRoutes = require('../routes/users');
const authRoutes = require('../routes/auth');
const favoriteAdd = require('../routes/favoriteadd.js');
const favoriteDel = require('../routes/favoritedel.js');
const favorites = require('../routes/favorites');
const favoriteprivate = require('../routes/favoriteprivate');
const OthersFavorite = require('../routes/otherfavorite');
const {response} = require('express');
const selfPlaylist = require('../routes/selfplaylist');

app.use('/.netlify/functions/api/users', userRoutes);
app.use('/.netlify/functions/api/auth', authRoutes);
app.use('/.netlify/functions/api/favoriteadd', favoriteAdd);
app.use('/.netlify/functions/api/favoritedel', favoriteDel);
app.use('/.netlify/functions/api/favorite', favorites);
app.use('/.netlify/functions/api/favoritepvt/', favoriteprivate);
app.use('/.netlify/functions/api/userplaylist/', OthersFavorite);
app.use('/.netlify/functions/api/selfplaylist', selfPlaylist);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port...`));

module.exports.handler = serverless(app);
