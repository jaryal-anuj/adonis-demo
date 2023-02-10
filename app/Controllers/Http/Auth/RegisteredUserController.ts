import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RenderResponse } from '@ioc:EidelLev/Inertia';
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';
import Event from '@ioc:Adonis/Core/Event';

export default class RegisteredUserController {

    public async create({inertia}:HttpContextContract):RenderResponse{
        return inertia.render('Auth/Register');
    }

    public async store({request, auth, response}:HttpContextContract){
        await request.validate(CreateUserValidator);
        const { name, email, password } = request.body();
        const user = await User.create({ name, email, password });
        await auth.use('web').login(user);
		Event.emit('new:user', user);
        response.redirect('/dashboard');
    }
}
