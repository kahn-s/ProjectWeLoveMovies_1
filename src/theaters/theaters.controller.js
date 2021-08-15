const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const theatersService = require("./theaters.service.js");

async function list(req, res) {
  const data = await theatersService.list();
  console.log(data);
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
