const { getAllPlayer } = require('./db');
const getImages = require('./getImages');

class Player {
    constructor(name, images) {
        this.name = name;
        this.images = images;
    }   
}

const getAllPlayerImage = async () => {
    const arrPlayer = [];
    const arrayName = await getAllPlayer();
    for (let i = 0; i < arrayName.length; i++) {
        const arrThumb = await getImages(arrayName[i]);
        console.log(`Load image for ${arrayName[i]}`);
        arrPlayer.push(new Player(arrayName[i], arrThumb));
    }
    return Promise.resolve(arrPlayer);
};

module.exports = getAllPlayerImage;
