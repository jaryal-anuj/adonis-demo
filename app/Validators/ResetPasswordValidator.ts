import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}


	public schema = schema.create({
		token:schema.string(),
		email:schema.string({},[ rules.email() ]),
		password: schema.string([
			rules.confirmed(),rules.minLength(8),rules.maxLength(20)
		])
	})

  	public messages: CustomMessages = {
		'required':"The {{ field }} field is {{rule}}",
		'email':"The {{field}}  must be a valid email address.",
		'minLength': 'The {{ field }} must be at least {{ options.minLength }} characters.',
		'maxLength': 'The {{ field }} must not be greater than {{ options.maxLength }} characters.',
		'confirmed':'The {{ field }} confirmation does not match.',
		'*': (field, rule) => {
		return `${rule} validation error on ${field}`
		}
	}
}
