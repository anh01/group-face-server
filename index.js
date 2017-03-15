const express = require('express');
const formidble = require('express-formidable')({ uploadDir: './public' });
const fs = require('fs');
const rename = require('./api/rename');
const getFaceIds = require('./api/getFaceFromImage');

// const getFaceByImageUrl = require('./api/uploadFace');
// const getNameByFaceId = require('./api/identify');

const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log('server started'));

app.get('/', (req, res) => res.send('Still alive'));

app.post('/upload', formidble, async (req, res) => {
    const { path } = req.files.avatar;
    try {
        const filename = await rename(path);
        const faceIds = await getFaceIds(`https://groupkhoapham.herokuapp.com/${filename}`);
        res.send(faceIds);
    } catch (e) {
        res.send(`${e} `);
    }
});

app.get('/test/:filename', (req, res) => {
    const { filename } = req.params;
    getFaceIds(`https://groupkhoapham.herokuapp.com/${filename}`)
    .then(faceIds => {
        console.log(faceIds);
        res.send('xong');
    })
    .catch(err => console.log(err));
});

app.get('/list', (req, res) => {
  fs.readdir('./public', (err, files) => {
    if (err) return res.send(`${err} `); 
    res.send(files.join('\n'));
  });
});
