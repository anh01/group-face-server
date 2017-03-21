const pg = require('pg');

const config = {
    user: 'kntzuzbltdcgng',
    password: '5aa239fcfeca40b9f4fce83f06e045e669b4b901108677c49cc2cc2ae87f2831',
    database: 'd2p4koho8mrent',
    port: 5432,
    host: 'ec2-54-235-153-124.compute-1.amazonaws.com',
    ssl: true,
    idleTimeoutMillis: 1000,
    max: 100000
};

const pool = new pg.Pool(config);

//Function chính để thực thi truy vấn
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

//Function để thêm cầu thủ
function insertPlayer(name) {
    const sql = 'INSERT INTO public."Player"(name) VALUES ($1);';
    const arrayData = [name];
    return executeQuery(sql, arrayData)
    .then(() => console.log(`INSERT ${name} THANH CONG`))
    .catch(err => console.log(`INSERT ${name} THAT BAI: ${err}`));
}

//Lấy tất cả dữ liệu cầu thủ
function getAllPlayer() {
    const sql = 'SELECT name FROM "Player"';
    return executeQuery(sql, [])
    .then(result => result.rows.map(e => e.name));
}

//Thêm 1 hình ảnh vào database
const addImageToDatabase = (playerId, image) => {
    const sql = 'INSERT INTO public."Image"(filename, "playerId") VALUES ($1, $2)';
    const arrayData = [image, playerId];
    return executeQuery(sql, arrayData).then(() => 'THEM THANH CONG');
};

//Thêm 1 mảng hình vào database cho một cầu thủ
const addImagesForPlayer = async (playerId, images) => {
    for (let i = 0; i < images.length; i++) {
        await addImageToDatabase(playerId, images[i]);
    }
};

//Lấy id cầu thủ truyền vào tên
const getIdByName = async (name) => {
    const sql = 'SELECT id FROM "Player" WHERE name = $1';
    const arrayData = [name];
    return executeQuery(sql, arrayData).then(result => result.rows[0].id);
};

//Lấy mảng hình ảnh của cầu thủ truyền vào id
const getImagesByIdPlayer = (idPlayer) => {
    const sql = 'SELECT * FROM "Image" WHERE "playerId" = $1';
    const arrayData = [idPlayer];
    return executeQuery(sql, arrayData)
    .then(result => result.rows);
};

//Xoá hình ảnh truyền vào id của hình ảnh
const removeImageById = (id) => {
    const sql = 'DELETE FROM "Image" WHERE id = $1';
    const arrayData = [id];
    return executeQuery(sql, arrayData).then(() => `XOA THANH CONG HINH ANH ${id}`);
};

//Lấy tất cả hình ảnh
const getAllImage = () => {
    const sql = 'SELECT * FROM "Image"';
    const arrayData = [];
    return executeQuery(sql, arrayData)
    .then(result => result.rows);
};

module.exports = { 
    executeQuery,
    insertPlayer, 
    getAllPlayer, 
    addImageToDatabase, 
    addImagesForPlayer, 
    getIdByName,
    getImagesByIdPlayer,
    removeImageById,
    getAllImage
};

// const insertAllData = async () => {
    //     try {
    //         for (let i = 0; i < data.length; ++i) {
    //             const player = data[i];
    //             const id = await getIdByName(player.name);
    //             console.log(`id for ${player.name} is ${id}`);
    //             await addImagesForPlayer(id, player.images);
    //             console.log(`Add ${player.images.length} images from ${player.name}`);
    //         }
    //     } catch (err) {
    //         console.log(err, `${err} `);
    //     }
    // };
    // insertAllData();
    // console.log(data[0].images[3]);
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
    // addImagesForPlayer(1, ['safda', 'fdafda']);
    // getImagesByIdPlayer(1)
// .then(res => console.log(res));


