const request = require('then-request');

const KEY = '8f55f88dae864cdb9d4e9cb3419cc25e';

function getImagesFromName(name) {
    const url = `https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${name}`;
    return request('GET', url, { 
        headers: { 'Ocp-Apim-Subscription-Key': KEY }
    })
    .then(res => res.getBody('utf8'))
    .then(result => {
        const arrOutput = JSON.parse(result).value.map(e => e.thumbnailUrl);
        return arrOutput;
    });
}

module.exports = getImagesFromName;
