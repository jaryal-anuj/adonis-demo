import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePasswordValidator {


	constructor(protected ctx: HttpContextContract) {

	}

	public schema = schema.create({
		current_password:schema.string({}, [
			rules.currentPassword(this.ctx.auth.user!.password)
		]),
		password:schema.string({},[
			rules.confirmed(),rules.minLength(8),rules.maxLength(20)
		])
	})

  	public messages: CustomMessages = {
		'currentPassword':'The password is incorrect.',
		'required':"The {{ field }} field is {{rule}}",
		'minLength': 'The {{ field }} must be at least {{ options.minLength }} characters.',
		'maxLength': 'The {{ field }} must not be greater than {{ options.maxLength }} characters.',
		'confirmed':'The {{ field }} confirmation does not match.',
		'*': (field, rule) => {
			return `${rule} validation error on ${field}`
		}
	}
}
