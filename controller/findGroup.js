const rename = require('../api/rename');
const getFaceIds = require('../api/getFaceFromImage');

// const getFaceByImageUrl = require('./api/uploadFace');
const getPersonsFromFaceIds = require('../api/identify');
const getNames = require('../api/getNamesFromIds');

const findGroupByUploadFile = async (req, res) => {
    const { path } = req.files.avatar;
    try {
        const filename = await rename(path);
        const faceIds = await getFaceIds(`https://groupkhoapham.herokuapp.com/${filename}`);
        const personIds = await getPersonsFromFaceIds(faceIds);
        const names = getNames(personIds);
        res.send(names);
    } catch (e) {
        res.send(`${e} `);
    }
};

module.exports = findGroupByUploadFile;
