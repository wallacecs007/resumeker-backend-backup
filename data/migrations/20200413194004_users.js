exports.up = async function(knex) {

    await knex.schema.createTable("users", (users) => {
        users.increments("id")
        users.string("username", 15)
            .notNullable()
            .unique()
        users.string("first_name")
        users.string("last_name")
        users.string("email")
            .unique()
        users.binary('img_url', 250)
        users.string("role")
            .defaultTo("user")
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users");
  };