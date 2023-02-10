import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import UpdatePasswordValidator from 'App/Validators/UpdatePasswordValidator';

export default class PasswordsController {

    public async update({request, auth, response }:HttpContextContract){
		let user = auth.user as User;
        await request.validate(UpdatePasswordValidator);
        user.password = request.input('password');
        await user.save();

        return response.redirect().back();
    }
}
