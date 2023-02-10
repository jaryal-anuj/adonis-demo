
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User';
import { string } from '@ioc:Adonis/Core/Helpers'
import { ValidationException } from '@ioc:Adonis/Core/Validator';
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator';
import { DateTime } from 'luxon';

export default class NewPasswordController {

    public async create({ inertia, request }:HttpContextContract){
        return inertia.render('Auth/ResetPassword',{
            token:request.param('token'),
            email:request.qs().email
        });
    }

    public async store({ request, response, session }:HttpContextContract){
        await request.validate(ResetPasswordValidator);
		let {email, password, token} = request.all();
		let user:User;
		try{
			user = await User.findByOrFail('email',email);
		}catch(e){
			throw new ValidationException(true,{
                email: "Email address not found",
            });
		}
        let result = await Database
								.from('password_resets')
								.where({'email':email, token:token})
								.first();

        if(result){
			let duration = DateTime.fromJSDate(result.created_at).plus({seconds:60*60}).diffNow('minutes').as('minutes');
			if(duration > 0) {
				user.password = password;
				user.rememberMeToken = string.generateRandom(60)
				await user.save()
				await Database
							.from('password_resets')
							.where({'email':email, token:token})
							.delete();
				session.flash('status','Your password has been reset!');
				return response.redirect().toRoute('login');
			}else{
				throw new ValidationException(true,{
                	email: "Token is expired",
            	});
			}

        }else{
			throw new ValidationException(true,{
                email: "Token is invalid",
            });
		}

    }
}
