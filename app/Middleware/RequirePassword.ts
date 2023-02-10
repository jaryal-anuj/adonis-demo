import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon';

export default class RequirePassword {

	protected passwordTimeout:number=10800;

	public async handle({response, session}: HttpContextContract, next: () => Promise<void>) {
		if(await this.shouldConfirmPassword(session)){
	
			response.redirect().toRoute('password.confirm');
		}
		await next()
	}

	protected async shouldConfirmPassword(session:HttpContextContract['session'], passwordTimeoutSeconds:number|null=null):Promise<boolean>{
		let currentTimestamp =DateTime.now().toMillis();
		let confirmedTimestamp:number = session.get('auth.password_confirmed_at',0);
		let confirmedAt = (currentTimestamp-confirmedTimestamp)/1000;

		return confirmedAt > (passwordTimeoutSeconds || this.passwordTimeout);
	} 
}
