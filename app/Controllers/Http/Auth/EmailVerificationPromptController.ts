import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailVerificationPromptController {

    public async index({ inertia, session }:HttpContextContract){
        return inertia.render('Auth/VerifyEmail',{
            status:session.flashMessages.get('status')
        })
    }
}
