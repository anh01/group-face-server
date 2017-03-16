const pg = require('pg');

const config = {
    user: 'kntzuzbltdcgng',
    password: '5aa239fcfeca40b9f4fce83f06e045e669b4b901108677c49cc2cc2ae87f2831',
    database: 'd2p4koho8mrent',
    port: 5432,
    host: 'ec2-54-235-153-124.compute-1.amazonaws.com',
    ssl: true,
    idleTimeoutMillis: 1000
};

const pool = new pg.Pool(config);

function executeQuery(sql, arrayData) {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
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
    const sql = 'SELECT "name" FROM "Users" WHERE "faceId" IN ($1, $2, $3, $4, $5)';
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

const getAllEmployee = () => (
    executeQuery('SELECT id, name, image, "faceId" FROM public."Users";')
    .then(result => result.rows)
);

const insertAnEmployee = (name, image, faceId) => {
    const sql = 'INSERT INTO public."Users"(name, image, "faceId") VALUES ($1, $2, $3)';
    const arrayData = [name, image, faceId];
    return executeQuery(sql, arrayData);
};

module.exports = { findNamesFromFaceIds, getAllEmployee, insertAnEmployee };

getAllEmployee()
.then(employees => console.log(employees))
.catch(err => console.log(err));
