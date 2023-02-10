import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator';
import crypto from 'crypto';
import { string } from '@ioc:Adonis/Core/Helpers';
import Mail from '@ioc:Adonis/Addons/Mail';
import Database from '@ioc:Adonis/Lucid/Database';
import { DateTime } from 'luxon';
import Env from '@ioc:Adonis/Core/Env';
import Route from '@ioc:Adonis/Core/Route'
import ResetPassword from 'App/Mailers/ResetPassword';

export default class PasswordResetLinkController {

    public async create({ inertia, session }:HttpContextContract) {
        return inertia.render('Auth/ForgotPassword',{
            status:session.flashMessages.get('status')
        });
    }

    public async store({request, session, response}:HttpContextContract){

        const emailSchema = schema.create({
            email:schema.string({},[ rules.email() ])
        });
        const messages = {
            'required':"The {{ field }} field is {{rule}}",
		    'email':"The {{field}}  must be a valid email address.",
        }
        await request.validate({schema:emailSchema, messages:messages});

        const email = request.input('email');
        const token = crypto.createHmac('sha256','secret').update(string.generateRandom(40)).digest("hex");
		await Database.from('password_resets').where('email',email).delete();
        await Database.table('password_resets').insert({email,token,created_at:DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')});
		let url = Env.get('APP_URL')+Route.makeUrl('password.reset',[token],{ qs:{email} });
		await new ResetPassword(email,url).sendLater();
        session.flash('status','We have emailed your password reset link!');
        return response.redirect().back()

    }
}
