const getSimilarFaceId = require('./getSimilarFaceId');

const getAll = async (arrayFaceIds) => {
    const arraySimilarFaceIds = [];
    try {
        for (let i = 0; i < arrayFaceIds.length; i++) {
            try {
                const similarId = await getSimilarFaceId(arrayFaceIds[i]);
                arraySimilarFaceIds.push(similarId);
            } catch (e) {
                console.log(`Face not found:${arrayFaceIds[i]}`);
            }
        }
        return Promise.resolve(arraySimilarFaceIds);
    } catch (e) {
        return Promise.reject(e);
    }
};

module.exports = getAll;

// getAll([
//     'e27b3a3c-4e38-44ef-916a-e9d311e5a4bb',
//     'e38cb217-28c8-4396-b643-b4db9aad0a66'
// ])
// .then(ids => console.log(ids));
