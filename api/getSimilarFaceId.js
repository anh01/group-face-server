const request = require('then-request');

const KEY = '6849f848e58547a3997fd750e0ac4a3b';

function getSimilarFaceId(faceId) {
    const url = 'https://westus.api.cognitive.microsoft.com/face/v1.0/findsimilars';
    return request('POST', url, { 
        headers: { 'Ocp-Apim-Subscription-Key': KEY },
        json: {
            faceId,
            faceListId: 'employee',  
            maxNumOfCandidatesReturned: 1,
            mode: 'matchPerson'
        }
    })
    .then(res => res.getBody('utf8'))
    .then(result => {
        const face = JSON.parse(result);
        if (face.length === 0) return '';
        return face[0].persistedFaceId;
    })
    .catch(() => '');
}

module.exports = getSimilarFaceId;
