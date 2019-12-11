const express = require('express');
const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/car-dealer.db3'
  },
  useNullAsDefault: true
})

const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.status(200).json(cars);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'failed to retrieve'})
  })
}) 

router.get('/:id', (req, res) => {
  const { id } = req.params

  db('cars')
  .where({ id })
  .first()
  .then(cars => {
    res.status(200).json(cars)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: 'failed to retrieve by id'})
  })
})

router.post('/', (req, res) => {
  const carData = req.body;
  if (carData.vin && carData.make && carData.modle && carData.mileage) {
    db('cars')
    .insert(carData)
    .then(cars => {
    return db('cars')
      .where({ id: cars[0] })
      .then(newCar => {
        res.status(201).json(newCar)
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'failed to insert' })
    })
  }

})

module.exports = router; 