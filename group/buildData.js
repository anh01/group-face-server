const { post } = require('./request');
const { executeQuery } = require('./db');

const personGroupId = 'player';

const getAllPlayer = () => {
    const sql = 'SELECT id, name FROM "Player"';
    return executeQuery(sql, [])
    .then(result => result.rows);
};

//Tạo person trong API trả về personId
//Test successfully
const createNewPerson = (playerId, name) => {
    const url = `https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/${personGroupId}/persons`;
    const data = {
        name,
        userData: playerId
    };
    return post(url, data).then(res => res.personId);
};

//Insert personId vào CSDL
//Test successfully
const insertPersonId = (idPlayer, idPerson, name) => {
    const sql = 'UPDATE public."Player" SET "personId"= $2 WHERE id = $1';
    const arrayData = [idPlayer, idPerson];
    return executeQuery(sql, arrayData)
    .then(() => `${name} got idPerson: ${idPerson}`);
};

//Select all images - personIds
//Test successfully
const getAllImagesAndPersonIds = () => {
    const sql = `SELECT "Image"."filename", "Player"."personId"
                FROM "Image"
                INNER JOIN "Player"
                ON "Image"."playerId" = "Player"."id"`;
    return executeQuery(sql, [])
    .then(result => result.rows);
};

//Add face for Person 
//Test successfully
const addFaceForPlayer = (image, personId) => {
    const url = `https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/${personGroupId}/persons/${personId}/persistedFaces`;
    const data = {
        url: image
    };
    return post(url, data)
    .then(() => console.log(`Add thanh cong ${image}`))
    .catch(() => console.log('Add that bai'));
};

const wait = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 3000);
});
//Add all face
const addAllFace = async () => {
    const arrayPlayers = await getAllImagesAndPersonIds();
    for (let i = 0; i < arrayPlayers.length; i++) {
        const { filename, personId } = arrayPlayers[i];
        await addFaceForPlayer(filename, personId); 
        await wait();
    }
};

module.exports = {
    createNewPerson,
    insertPersonId,
    getAllImagesAndPersonIds,
    addFaceForPlayer,
    addAllFace
};

const createPersonIdForAll = async () => {
    const arrayPlayers = await getAllPlayer();
    for (let i = 0; i < arrayPlayers.length; i++) {
        const { id, name } = arrayPlayers[i];
        const personId = await createNewPerson(id, name);
        await insertPersonId(id, personId, name);
        console.log(id, name, personId);
    }
};

addAllFace();

// createPersonIdForAll();
