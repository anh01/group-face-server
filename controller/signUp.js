const rename = require('../api/rename');

const signUp = async (req, res) => {
    const { name } = req.body;
    const { path } = req.files.avatar;
    const filename = await rename(path);
    
};

module.exports = signUp;
