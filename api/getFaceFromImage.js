const request = require('then-request');

const KEY = '6849f848e58547a3997fd750e0ac4a3b';

function getFaceIdsFromImage(imageUrl) {
    const url = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect';
    return request('POST', url, { 
        headers: { 'Ocp-Apim-Subscription-Key': KEY },
        json: {
            url: imageUrl
        }
    })
    .then(res => res.getBody('utf8'))
    .then(result => {
        const arr = JSON.parse(result);
        if (arr.length === 0) throw new Error('NO_FACE_IN_IMAGE');
        return arr.map(e => e.faceId);
    });
}

module.exports = getFaceIdsFromImage;

// uploadFace('https://khoapham-face.herokuapp.com/tien.png')
// .then(res => console.log(res));
