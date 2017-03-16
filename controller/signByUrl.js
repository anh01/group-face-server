/*
    JUST FOR TESTING
    AND IT OK!
*/
const getFaceFromImage = require('../api/getFaceFromImage');
const { insertAnEmployee } = require('../api/db');

const createEmployee = async (req, res) => {
    const { url, name } = req.body;
    try {
        //faceIds is an array. Each photo may have some faces inside. So api return an array
        const faceIds = await getFaceFromImage(url);
        const employeeFaceId = faceIds[0];
        insertAnEmployee(name, url, employeeFaceId)
        .then(() => res.send('DANG_KY_THANH_CONG'));
    } catch (err) {
        res.send(`${err} `);
    }
};

module.exports = createEmployee;
