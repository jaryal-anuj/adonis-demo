import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EnsureEmailIsVerified {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {

    if(!auth.user?.emailVerifiedAt){
      return response.redirect().toRoute('verification.notice');
    }
    await next()
  }
}
