import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
		table.increments('id').primary()
		table.string('name').notNullable()
		table.string('email', 255).notNullable().unique()
		table.string('password', 255).notNullable()
		table.string('remember_me_token',100)
		table.string('profile_photo_path',2048)
		table.timestamp('email_verified_at',{useTz:true})
		/**
		 * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
		 */
		table.timestamp('created_at', { useTz: true })
		table.timestamp('updated_at', { useTz: true })
	})
  }

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
