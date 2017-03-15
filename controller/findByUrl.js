const getFaceIds = require('../api/getFaceFromImage');

// const getFaceByImageUrl = require('./api/uploadFace');
const getAllSimilarFaceId = require('../api/getAllSimilar');
const { findNamesFromFaceIds } = require('../api/db');

const findGroupByUploadFile = async (req, res) => {
    const { image } = req.body;
    try {
        const faceIds = await getFaceIds(image);
        const similarFaceIds = await getAllSimilarFaceId(faceIds);
        const names = await findNamesFromFaceIds(similarFaceIds);
        res.send(names);
    } catch (e) {
        res.send(`${e} `);
    }
};

module.exports = findGroupByUploadFile;
