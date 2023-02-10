import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';
import ProfileInfoValidator from 'App/Validators/ProfileInfoValidator';



export default class ProfileController {
    public async edit({inertia, session,auth}:HttpContextContract){
		let user = auth.user as User;

        return inertia.render('Profile/Edit',{
            'mustVerifyEmail':user.emailVerifiedAt=== null,
            'status':session.flashMessages.get('status')
        })
    }

    public async update({ request, auth, response }:HttpContextContract){
		let user = auth.user as User;
        await request.validate(ProfileInfoValidator);
		const photo = request.file('photo');

		if (photo) {
			user.updateProfilePhoto(photo);
		}
        let { name, email} = request.all();

		if(email !== user.email){
			user.name = name;
			user.email = email;
			user.emailVerifiedAt = null;
			//@TODO send verification email
		}else{
			user.name = name;
			user.email = email;
		}


		await user.save();

        return response.redirect().toRoute('profile.edit');
    }

    public async destroy({request, auth, response, session}:HttpContextContract){

        let user = auth.user as User;
        await request.validate({schema:schema.create({
            password: schema.string({}, [rules.currentPassword(user.password)]),
          })
        });

        await auth.use('web').logout();
        await user.delete();
		session.clear();
        session.regenerate();

        return response.redirect('/');
    }

	public async deleteProfilePhoto({ auth,response }:HttpContextContract){
		let user = auth.user!;
		await user.deleteProfilePhoto();
		return response.redirect().back();
	}
}
