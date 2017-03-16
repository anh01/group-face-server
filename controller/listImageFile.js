const fs = require('fs');

const getListImageFile = (req, res) => {
  fs.readdir('./public', (err, files) => {
    if (err) return res.send(`${err} `); 
    res.send(files.join('\n'));
  });
};

module.exports = getListImageFile;
