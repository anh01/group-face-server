const express = require('express');
const formidble = require('express-formidable')({ uploadDir: './public' });
const jsonParser = require('body-parser').json();

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(process.env.PORT || 3000, () => console.log('server started'));

app.get('/', (req, res) => res.send('Still alive'));

app.get('/list', require('./controller/listImageFile'));

app.get('/listEmployee', require('./controller/listEmployee'));

app.post('/upload', formidble, require('./controller/findGroup'));

app.post('/findbyimage', jsonParser, require('./controller/findByUrl'));

app.post('/createEmployee', formidble, require('./controller/createEmployee'));

// const { getImagesByIdPlayer, removeImageById } = require('./group/db');

// app.get('/getImage/:playerId', async (req, res) => {
//     const { playerId } = req.params;
//     const data = await getImagesByIdPlayer(playerId);
//     res.render('images', { data });
// });
// app.get('/xoa/:imageId/:playerId', (req, res) => {
//     const { imageId, playerId } = req.params;
//     removeImageById(imageId)
//     .then(() => res.redirect(`/getImage/${playerId}`));
// });

const { getAllImage } = require('./group/db');

app.get('/getAllImage', (req, res) => {
    getAllImage()
    .then(images => res.send(`${images.length} `))
    .catch(err => res.send(err));
});
