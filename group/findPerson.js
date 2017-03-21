const { post } = require('./request');

const personGroupId = 'player';
//Test OK
const getFaceIdsByImage = (imageUrl) => {
    const url = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect';
    return post(url, { url: imageUrl })
    .then(arrayFaces => arrayFaces.map(e => e.faceId));
};

// getFaceIdsByImage('http://i2.cdn.cnn.com/cnnnext/dam/assets/160412203255-real-madrid-team-super-169.jpg')
// .then(faceIds => console.log(faceIds));

//Test OK
const getPeopleFromFaces = (arrayFaceIds) => {
    const url = 'https://westus.api.cognitive.microsoft.com/face/v1.0/identify';
    const data = {
        personGroupId,
        faceIds: arrayFaceIds,
        maxNumOfCandidatesReturned: 1,
        confidenceThreshold: 0.5
    };
    return post(url, data)
    .then(faceResults => faceResults.map(result => {
        try {
            return result.candidates[0].personId;
        } catch (err) {
            return '';
        }
    }));
};

// getPeopleFromFaces([
//     'd4279438-4655-434c-bd05-98baadd68424', 
//     'd47f9773-2497-441b-906e-55ae30eeb754'
// ]).then(arrayPersonId => console.log(arrayPersonId));

const getNameFromPersonIds = (arrayPersonId) => {
    const sql = `SELECT * FROM "Users" WHERE "personId" IN `;
};

module.exports = { getFaceIdsByImage, getPeopleFromFaces, getNameFromPersonIds };
