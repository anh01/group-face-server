const pg = require('pg');

const connectStringOnline = 'postgres://kntzuzbltdcgng:5aa239fcfeca40b9f4fce83f06e045e669b4b901108677c49cc2cc2ae87f2831@ec2-54-235-153-124.compute-1.amazonaws.com:5432/d2p4koho8mrent';
const connectStringOffline = 'postgres://postgres:khoapham@localhost:5432/NODE1102';
const connectString = process.env.PORT ? connectStringOnline : connectStringOffline;

function executeQuery(sql, arrayData) {
    return new Promise((resolve, reject) => {
        pg.connect(connectString, (err, client, done) => {
            if (err) return reject(err);
            client.query(sql, arrayData, (errQuery, result) => {
                if (errQuery) return reject(errQuery); 
                resolve(result);
                done(errQuery);
            });
        });
    });
}

const findNamesFromFaceIds = async (faceIds) => {
    const sql = `SELECT "name" FROM "Users" WHERE "faceId" IN ($1, $2, $3, $4, $5)`;
    try {
        const dataArray = ['', '', '', '', ''];
        faceIds.forEach((e, i) => {
            if (i > 4) return;
            dataArray[i] = e;
        });
        const result = await executeQuery(sql, dataArray);
        return Promise.resolve(result.rows.map(e => e.name));
    } catch (e) {
        return Promise.reject(e);
    }
};

module.exports = { findNamesFromFaceIds };

// findNamesFromFaceIds(['1e327b5f-dd4f-4683-8bd0-a0773d8637dd'])
// .then(names => console.log(names));

executeQuery('SELECT "name", "faceId", "image" from "Users"')
.then(result => {
    result.rows.forEach(e => {
        console.log(`('${e.name}', '${e.image}', '${e.faceId}')`);
    });
});
// .then(arr => console.log(arr));
