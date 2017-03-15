const request = require('then-request');
// const arrayEmp = require('../data');

const groupId = 'employee';
const KEY = '6849f848e58547a3997fd750e0ac4a3b';

// function getText(text, post, pre) {
//   const start = text.indexOf(post) + post.length;
//   const stop = text.indexOf(pre);
//   return text.substring(start, stop);
// }

function identify(faceIds) {
    const url = 'https://westus.api.cognitive.microsoft.com/face/v1.0/identify';
    return request('POST', url, { 
        headers: { 'Ocp-Apim-Subscription-Key': KEY },
        json: {    
            personGroupId: groupId,
            faceIds,
            maxNumOfCandidatesReturned: 1,
            confidenceThreshold: 0.5
        }
     })
     .then(res => JSON.parse(res.getBody('utf8')))
     .then(arr => arr.map(e => e.candidates[0].personId));
}

module.exports = identify;

// identify('3c9c5ca3-01ed-4aaa-93b3-a06d3ac8e2a9')
// .then(name => console.log(name));
