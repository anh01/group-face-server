const { getAllEmployee } = require('../api/db');

const listEmployee = (req, res) => {
  getAllEmployee()
  .then(employees => res.send(employees))
  .catch(err => res.send(err));
};

module.exports = listEmployee;
