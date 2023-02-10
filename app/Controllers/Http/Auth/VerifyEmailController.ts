import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import { DateTime } from 'luxon';

export default class VerifyEmailController {
    public async index({auth, response}:HttpContextContract){
        let user = auth.user as User;
		if(!user.emailVerifiedAt) {
			user.emailVerifiedAt = DateTime.now();
			await user.save();
		}
		console.log("here response");
        return response.redirect().withQs({ verified: 1 }).toRoute('dashboard');

    }
}
