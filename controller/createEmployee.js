const rename = require('../api/rename');
const getFaceFromImage = require('../api/getFaceFromImage');
const { insertAnEmployee } = require('../api/db');

const hostLink = 'https://groupkhoapham.herokuapp.com/';

const createEmployee = async (req, res) => {
    const { path } = req.files.avatar;
    const { name } = req.fields;
    console.log(name, path);
    try {
        const filename = await rename(path);
        //faceIds is an array. Each photo may have some faces inside. So api return an array
        const faceIds = await getFaceFromImage(hostLink + filename);
        const employeeFaceId = faceIds[0];
        insertAnEmployee(name, filename, employeeFaceId)
        .then(() => res.send('DANG_KY_THANH_CONG'));
    } catch (err) {
        res.send(`${err} `);
    }
};

module.exports = createEmployee;
