const express = require('express');
const formidble = require('express-formidable')({ uploadDir: './public' });
const fs = require('fs');
const rename = require('./api/rename');
// const getFaceByImageUrl = require('./api/uploadFace');
// const getNameByFaceId = require('./api/identify');

const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log('server started'));

app.get('/', (req, res) => res.send('Still alive'));

// app.post('/findByUrl', parser, (req, res) => {
    //     const { imageUrl } = req.body;
    //     console.log('URL:::', imageUrl);
    //     getFaceByImageUrl(imageUrl)
    //     .then(faceId => {
    //         console.log('FACE ID:', faceId);
    //         return getNameByFaceId(faceId);
    //     })
    //     .then(name => { 
    //         console.log('NAME:', name);
    //         res.send(`${name} `);
    //     })
    //     .catch(err => console.log(err));
    // });
//Upload image
app.post('/upload', formidble, async (req, res) => {
    const { path } = req.files.avatar;
    rename(path)
    .then(filename => res.send(filename));
});

app.get('/list', (req, res) => {
  fs.readdir('./public', (err, files) => {
    if (err) return res.send(`${err} `); 
    res.send(files.join('\n'));
  });
});
