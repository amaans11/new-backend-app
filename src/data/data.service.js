const { mysqlPool } = require('../config/env.dev')
const { v4: uuidv4 } = require('uuid');

/**
 * Service Methods
 */

const getTableData = async () => {
  let conn
  let rows
  try {
    conn = await mysqlPool.getConnection();
    rows = await conn.query({sql: 'SELECT * FROM c3.THE_ANSWER', dateStrings: true});
    meta = rows.meta.map(rm => ({ name: rm.name(), type: rm.type }))
  } catch (err) {
    console.error(err)
    return false
  } finally {
    if (conn) conn.end();
  }
  return { rows, meta }
}

const saveFilter = async (body) => {
  for (let prop of ['filterJson', 'displayName']) {
    if (body[prop] == undefined) return false
  }
  let conn
  let queryRes
  jsonString = JSON.stringify(body.filterJson)
  try {
    conn = await mysqlPool.getConnection();
    queryRes = await conn.query({sql: 'INSERT INTO c3.filter_prefs VALUES (NULL,?,?,?,DEFAULT)', values: [body.displayName, jsonString, uuidv4()]});
  } catch (err) {
    console.error(err)
    throw err
  } finally { 
    if (conn) conn.end();
  }
  return true
}

const getFilters = async () => {
  let conn
  let rows
  try {
    conn = await mysqlPool.getConnection();
    rows = await conn.query({sql: 'SELECT * FROM c3.filter_prefs where deleted is FALSE'});
  } catch (err) {
    console.error(err)
    return false
  } finally {
    if (conn) conn.end();
  }
  return { rows }
}

const deleteFilter = async (uuid) => {
  let conn
  let queryRes
  try {
    conn = await mysqlPool.getConnection();
    queryRes = await conn.query({sql: 'UPDATE c3.filter_prefs SET deleted=TRUE WHERE uuid = ?', values: [uuid]});
  } catch (err) {
    console.error(err)
    return false
  } finally {
    if (conn) conn.end();
  }
  return true
}

module.exports = {
  getTableData,
  getFilters, 
  saveFilter,
  deleteFilter
};
