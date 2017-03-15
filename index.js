const express = require('express');
const formidble = require('express-formidable')({ uploadDir: './public' });
const fs = require('fs');
const rename = require('./api/rename');
const getFaceIds = require('./api/getFaceFromImage');
const jsonParser = require('body-parser').json();

// const getFaceByImageUrl = require('./api/uploadFace');
const getResponseFromFaceIds = require('./api/identify');

const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log('server started'));

app.get('/', (req, res) => res.send('Still alive'));

app.post('/upload', formidble, async (req, res) => {
    const { path } = req.files.avatar;
    try {
        const filename = await rename(path);
        const faceIds = await getFaceIds(`https://groupkhoapham.herokuapp.com/${filename}`);
        console.log(faceIds);
        res.send(faceIds);
    } catch (e) {
        res.send(`${e} `);
    }
});

app.post('/findListFace', jsonParser, (req, res) => {
    const faceIds = [
        '3134911c-05a2-4e2f-a38a-94de533a2666',
		'91581496-6148-4bc7-aa12-292a1acf3ca9'
    ];
    getResponseFromFaceIds(faceIds)
    .then(response => {
        console.log(response);
        const output = JSON.parse(response);
        console.log(output[0].candidates);
        res.send('Hello');
    });
});

app.get('/list', (req, res) => {
  fs.readdir('./public', (err, files) => {
    if (err) return res.send(`${err} `); 
    res.send(files.join('\n'));
  });
});

