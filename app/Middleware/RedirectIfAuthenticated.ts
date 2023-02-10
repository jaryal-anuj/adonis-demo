import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { GuardsList } from '@ioc:Adonis/Addons/Auth'

export default class RedirectIfAuthenticated {
	protected redirectTo = "/dashboard";
	public async handle({auth, response}: HttpContextContract,next: () => Promise<void>,customGuards: (keyof GuardsList)[]) {
		const guards = customGuards.length ? customGuards : [auth.name]
		for (let guard of guards) {
		if (await auth.use(guard).check()) {
			response.redirect(this.redirectTo);
		}
		}
		await next()
	}
}
