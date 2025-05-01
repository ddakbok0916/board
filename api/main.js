const fs = require('fs');
const _ = require('lodash');
const db = require('../lib/dbConnection');
const bcrypt = require('bcrypt');
const moment = require('moment');
const path = require('path');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const short = require('short-uuid');
const axios = require('axios');

module.exports = (expressApp) => {
  if (expressApp === null) {
    throw new Error('expressApp option must be an express server instance');
  }
  expressApp.get('/api/main/list', async (req, res) => {
    try {
      const listData = await db.connect(async function (conn) {
        let selectQuery = `
          SELECT *
          FROM list
          `;
        const [rows] = await conn.query(selectQuery);
        return rows;
      });

      res.json(listData);
    } catch (error) {
      console.error(error);
      res.status(500).end(error.message);
    }
  });

  expressApp.get('/api/main/detail', async (req, res) => {
    try {
      const { id } = req.query;
      const listData = await db.connect(async function (conn) {
        let selectQuery = `
          SELECT *
          FROM list
          WHERE id = ?
          `;
        const [rows] = await conn.query(selectQuery, [id]);
        return rows;
      });

      res.json(listData);
    } catch (error) {
      console.error(error);
      res.status(500).end(error.message);
    }
  });
};
