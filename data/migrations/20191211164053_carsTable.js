exports.up = function(knex) {
    return knex.schema.createTable('cars', cars => {
      cars.increments();
      cars.integer('Mileage', 9).notNullable();
      cars.text('Transmission', 128).nullable();
      cars.text('Title', 128).nullable();
      cars.text('VIN', 17).notNullable().unique()
      cars.text('Make', 128).notNullable();
      cars.text('Model', 128).notNullable();

    })
  };
  
  exports.down = function(knex) {
    return knex.schma.dropTableIfExists('cars');
  };