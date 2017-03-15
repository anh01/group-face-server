const express = require('express');
const formidble = require('express-formidable')({ uploadDir: './public' });
const fs = require('fs');
const jsonParser = require('body-parser').json();

const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log('server started'));

app.get('/', (req, res) => res.send('Still alive'));

app.post('/upload', formidble, require('./controller/findGroup'));

// app.post('/signup', formidble, require('./controller/signUp'));

app.post('/findbyimage', jsonParser, require('./controller/findByUrl'));

app.get('/list', (req, res) => {
  fs.readdir('./public', (err, files) => {
    if (err) return res.send(`${err} `); 
    res.send(files.join('\n'));
  });
});

