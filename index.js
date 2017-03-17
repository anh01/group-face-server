const express = require('express');
const formidble = require('express-formidable')({ uploadDir: './public' });
const jsonParser = require('body-parser').json();

const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log('server started'));

app.get('/', (req, res) => res.send('Still alive'));

app.get('/list', require('./controller/listImageFile'));

app.get('/listEmployee', require('./controller/listEmployee'));

app.post('/upload', formidble, require('./controller/findGroup'));

app.post('/findbyimage', jsonParser, require('./controller/findByUrl'));

app.post('/createEmployee', formidble, require('./controller/createEmployee'));

const getAll = require('./group/getAllPlayerImage');

app.get('/getImages', async (req, res) => {
    const data = await getAll();
    res.send(data);
});
