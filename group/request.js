const request = require('then-request');

const KEY = '6849f848e58547a3997fd750e0ac4a3b';

function post(url, data) {
    return request('POST', url, { 
        headers: { 'Ocp-Apim-Subscription-Key': KEY },
        json: data
     })
     .then(res => JSON.parse(res.getBody('utf8')));
}

function put(url, data) {
    return request('PUT', url, { 
        headers: { 'Ocp-Apim-Subscription-Key': KEY },
        json: data
     })
     .then(res => JSON.parse(res.getBody('utf8')));
}

function get(url) {
    return request('GET', url, {
        headers: { 'Ocp-Apim-Subscription-Key': KEY },
    })
    .then(res => JSON.parse(res.getBody('utf8')));
}

module.exports = { post, put, get };
