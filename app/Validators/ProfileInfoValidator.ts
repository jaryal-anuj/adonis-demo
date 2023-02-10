import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileInfoValidator {


	constructor(protected ctx: HttpContextContract) {}


	public schema = schema.create({
		name:schema.string({}, [ rules.alpha(),rules.maxLength(255) ]),
		email:schema.string({},[
			rules.email(),
			rules.maxLength(255),
			rules.unique({
				table: 'users',
				column: 'email',
				caseInsensitive: true,
				whereNot:{
					id:this.ctx.auth.user?.id
				}
			})
		]),
		photo:schema.file.nullable({
			size: '2mb',
			extnames: ['jpg', 'jpeg', 'png'],
		})
	})


	public messages: CustomMessages = {
		'alpha':"The {{ field }} must only contain letters.",
		'unique':"The {{ field }} has already been taken.",
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
