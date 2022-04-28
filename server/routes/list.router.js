const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...
///GET route
router.get('/', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order 
    
    const sqlText = `
      SELECT * FROM "shoppingList"
        ORDER BY "id" DESC;
    `;
    pool.query(sqlText)
      .then((dbResult) => {
        console.log(`Got stuff back from the database`, dbResult);
        res.send(dbResult.rows);
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
      })
  })
/// POST route
  router.post('/', (req, res) => {
    const list = req.body;
    console.log('heeeeeeres body!', req.body);
    const sqlText = `
      INSERT INTO "shoppingList"
        ("name", "quantity", "unit")
          VALUES
          ($1, $2, $3)
      `;
    const sqlValues = [
      list.name,
      list.quantity,
      list.unit

    ]
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
    // the $1, $2, etc get substituted with the values from the array below
    pool.query(sqlText, sqlValues)
      .then((dbResult) => {
        console.log(`Added list item to the database`, list);
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
      })
  })


module.exports = router;