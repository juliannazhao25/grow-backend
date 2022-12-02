const { createTableIfNotExists } = require('../helpers')

exports.up = async knex => createTableIfNotExists(knex, 'goals', table => {
  table
    .uuid('id')
    .notNullable()
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))

  table
    .uuid('userId')
    .notNullable()
    .references('users.id')

  table
    .string('goal')
    .notNullable()

  table
    .string('reward')
    .notNullable()

  table
    .string('punishment')
    .notNullable()

  table
    .string('vermin1')
    .notNullable()

  table
    .string('vermin2')

  table
    .string('vermin3')

  table
    .string('vermin4')

  table
    .string('vermin5')

  table.timestamp('createdAt').defaultTo(knex.fn.now())
  table.timestamp('updatedAt').defaultTo(knex.fn.now())
})

exports.down = async knex => knex.schema.dropTableIfExists('goals')
