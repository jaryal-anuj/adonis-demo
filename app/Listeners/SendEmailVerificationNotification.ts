import type { EventsList } from '@ioc:Adonis/Core/Event';
import VerifyEmail from 'App/Mailers/VerifyEmail';

export default class SendEmailVerificationNotification {

    public async handle(user: EventsList['new:user']){
		if(!user.emailVerifiedAt){
			await new VerifyEmail(user).sendLater();
		}
    }
}
