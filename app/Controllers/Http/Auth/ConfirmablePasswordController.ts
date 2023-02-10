import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon';
import { ValidationException } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class ConfirmablePasswordController {

    public async show({inertia}:HttpContextContract){
        return inertia.render('Auth/ConfirmPassword');
    }

    public async store({ auth, request, session,response }:HttpContextContract){

        let user = auth.user as User;
        try {
            await auth.use('web').verifyCredentials(user.email, request.input('password'));
            session.put('auth.password_confirmed_at',DateTime.now().toMillis());
            response.redirect().toRoute('profile.edit');
        } catch (e) {
			throw new ValidationException(true,{
                password: e.message,
            });
        }
    }
}
