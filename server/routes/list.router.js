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
      console.log(`Got stuff back from the database`, dbResult.rows);
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
  pool.query(sqlText, sqlValues)
    .then((dbResult) => {
      console.log(`Added list item to the database`, list);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    })

})

router.put("/:itemId", (req, res) => {
  console.log('in the PUT route');
  let sqlQuery = `
    UPDATE "shoppingList"
    SET "purchased"=$1
    WHERE "id"=$2;
    `;
  let sqlValues = [true, req.params.itemId];
  console.log('I am item id:', req.params.itemId);
  pool.query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log("error in PUT /treats db request:");
      res.sendStatus(500);
    });
});

router.delete("/:treatId", (req, res) => {
  let treatToDelete = req.params.treatId;
  let sqlQuery = `
    DELETE FROM "treats"
    WHERE "id"=$1;
    `;
  let sqlValues = [treatToDelete];
  pool
    .query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log("error in DELETE /treats db request:");
      res.sendStatus(500);
    });
});

module.exports = router;

// Let sql sanitize your inputs (NO Bobby Drop Tables here!)
// the $1, $2, etc get substituted with the values from the array below