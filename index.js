'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser);
app.post('/sendmail', (req, res) => {
  res.json({ error: null });
});

module.exports.handler = serverless(app);