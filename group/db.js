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

function insertPlayer(name) {
    const sql = 'INSERT INTO public."Player"( name) VALUES ($1);';
    const arrayData = [name];
    return executeQuery(sql, arrayData)
    .then(() => console.log(`INSERT ${name} THANH CONG`))
    .catch(err => console.log(`INSERT ${name} THAT BAI: ${err}`));
}

function getAllPlayer() {
    const sql = 'SELECT name FROM "Player"';
    return executeQuery(sql, [])
    .then(result => result.rows.map(e => e.name));
}

module.exports = { insertPlayer, getAllPlayer };

//TEST AND EXEC AREA

/*
    const insertRealMadrid = async () => {
        const arrayPlayer = ['Ronaldo', 'eylor Navas', 'Sergio Ramos', 'Pepe', 'Raphael Varane',
            'Marcelo', 'Toni Kroos', 'Casemiro', 'Luka Modric', 'Isco'];
        for (let i = 0; i < arrayPlayer.length; i++) {
            await insertPlayer(arrayPlayer[i]);
        }
    };
    insertRealMadrid();

    getAllPlayer()
    .then(names => console.log(names));
*/


