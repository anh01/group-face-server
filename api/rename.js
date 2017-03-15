const fs = require('fs');

/*
    Get the filename from path of file, that upload from react-native device
*/

const rename = (path) => (
    new Promise((resolve, reject) => {
        const directory = 'public/';
        const oldFilename = path.replace('public/', '');
        const newFilename = `${Date.now()}.png`;

        const oldPath = directory + oldFilename;
        const newPath = directory + newFilename;
        fs.rename(oldPath, newPath, err => {
            if (err) return reject(err);
            resolve(newFilename);
        });
    })
);

module.exports = rename;
