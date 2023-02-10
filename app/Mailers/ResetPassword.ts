import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env';

export default class ResetPassword extends BaseMailer {

	constructor(private email: string, private url:string){
		super();
	}

	public prepare(message: MessageContract) {
		message
			.subject('Reset Password Notification')
			.from(Env.get('MAIL_FROM_ADDRESS'), Env.get('MAIL_FROM_NAME'))
			.to(this.email)
			.htmlView('emails/reset_password',{url:this.url});
	}
}
