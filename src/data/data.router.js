/**
 * Required External Modules and Interfaces
 */

const express = require("express");
const { getTableData, getFilters, saveFilter, deleteFilter } = require("./data.service");
const { checkJwt } = require("../authz/check-jwt");

/**
 * Router Definition
 */

const dataRouter = express.Router();

/**
 * Controller Definitions
 */

// GET messages/

dataRouter.get("/tableData", checkJwt, async (req, res) => {
  const data =  { data: await getTableData() };
  res.status(200).send(data);
});

dataRouter.get("/test", async (req, res) => {
  const data =  { data: 'request worked!' };
  res.status(200).send(data);
});

dataRouter.post("/saveFilter", checkJwt, async (req, res) => {
  const data = { data: await saveFilter(req.body) }
  return res.status(200).send(data)
})

dataRouter.delete("/deleteFilter/:uuid", checkJwt, async (req, res) => {
  const data = { data: await deleteFilter(req.params.uuid) }
  return res.status(200).send(data)
})

dataRouter.get("/getFilters", checkJwt, async (req, res) => {
  const data = { data: await getFilters(req.body) || [] }
  return res.status(200).send(data)
})


module.exports = {
  dataRouter,
};
