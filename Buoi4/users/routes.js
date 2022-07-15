const express = require('express');
const router = express.Router();
const users = require('./user-data.json');
const client = require('../database/pg');

router.post('', async (req, res) => {
  const body = req.body;
  let results = new Array();
  req.body.forEach(async (element) => {
    try{
      const result = await client.query(`
        INSERT INTO users(id, name, age, address)
        VALUES ('${element.id}', '${element.name}', ${element.age}, '${element.address}')
      `);
      results.push(res);
    } catch(err){
      console.log("Can't save data with id : " + element.id);
    }
    
  });
  
  res.send(results);
});

router.get('', async(req, res) => {
  const result = await client.query(`
    SELECT *
    FROM users
  `);
  res.send(result.rows);
});

// TODO: Update user with parameter user's id
router.put('/:id', async(req, res) => {
  const element = req.body;
  const result = await client.query(`
    UPDATE users 
    SET name = '${element.name}', age = ${element.age}, address = '${element.address}' 
    WHERE id = '${element.id}'
    `);
    res.send(result.rows)
})

// TODO: Delete user with parameter user's id
router.delete('/:id', async(req, res) => {
  const element = req.params.id;
  //const id = req.params.id;
  const result = await client.query(`
    DELETE FROM users
    WHERE id = '${element}'
  `);
  res.send(result.rows);
})

module.exports = router;