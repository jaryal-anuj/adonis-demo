import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route';
import crypto from 'crypto';
import Env from '@ioc:Adonis/Core/Env';

export default class VerifyEmail extends BaseMailer {
	/**
	 * WANT TO USE A DIFFERENT MAILER?
	 *
	 * Uncomment the following line of code to use a different
	 * mailer and chain the ".options" method to pass custom
	 * options to the send method
	 */
	// public mailer = this.mail.use()

	/**
	 * The prepare method is invoked automatically when you run
	 * "VerifyEmail.send".
	 *
	 * Use this method to prepare the email message. The method can
	 * also be async.
	 */

	constructor(private user: User){
		super();
	}

	public prepare(message: MessageContract) {
		let verificationUrl = this.getVerificationUrl();

		message
			.subject('Verify Email Address')
			.from(Env.get('MAIL_FROM_ADDRESS'), Env.get('MAIL_FROM_NAME'))
			.to(this.user.email)
			.htmlView('emails/verify_email',{user:this.user,url:verificationUrl});
	}

	protected getVerificationUrl():string{
		let url = Route.builder()
					.params({
						id:this.user.id,
						hash:crypto
								.createHash('sha1').update(this.user.email).digest('hex')
					})
					.makeSigned('verification.verify',{expiresIn:'30m'});
		return Env.get('APP_URL')+url;
	}
}
