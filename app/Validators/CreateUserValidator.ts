import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
	public schema = schema.create({
		name:schema.string({}, [rules.alpha(), rules.maxLength(255)]),
		email:schema.string({},[rules.email(), rules.maxLength(255),rules.unique({ table: 'users', column: 'email' }) ]),
		password:schema.string({},[rules.confirmed(),rules.minLength(8),rules.maxLength(20)])
	})

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
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
