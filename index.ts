const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});  

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));