const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const theatersService = require("./theaters.service.js");

async function list(req, res) {
  const data = await theatersService.list();
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
