const data = require('../data');

const getNames = (listIds) => {
    const listFiltered = data.filter(e => listIds.indexOf(e.personId) > -1);
    const listName = listFiltered.map(person => person.name);
    return listName;
};

module.exports = getNames;

// console.log(getNames(['d11e9ce7-4761-44c8-bb38-8fdf5a0981df']));
