import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import VerifyEmail from 'App/Mailers/VerifyEmail';
import User from 'App/Models/User';

export default class EmailVerificationNotificationController {

    public async store({ response, session, auth}:HttpContextContract){
        let user = auth.user as User;
		await new VerifyEmail(user).sendLater();
        session.flash('status', 'verification-link-sent');
        return response.redirect().back();
    }
}
