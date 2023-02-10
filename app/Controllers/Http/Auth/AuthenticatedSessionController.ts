import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route';
import LoginValidator from 'App/Validators/LoginValidator';
import { ValidationException } from '@ioc:Adonis/Core/Validator';

export default class AuthenticatedSessionController {

    public async create({inertia, session}:HttpContextContract){
        return inertia.render('Auth/Login',{
            'canResetPassword': Route.has('password.request'),
            'status':session.flashMessages.get('status')
        });
    }

    public async store({request,response,auth}:HttpContextContract){
        const { email, password, remember } = request.all();
        await request.validate(LoginValidator);
        try{
            await auth.use('web').attempt(email, password,remember);
            response.redirect('/dashboard');
        }catch(e){
            throw new ValidationException(true,{
                email: e.message.split(":")[1],
            });
        }

    }

    public async destroy({auth,response}:HttpContextContract){
        await auth.use('web').logout()
        response.redirect('/login')
    }

  
}
