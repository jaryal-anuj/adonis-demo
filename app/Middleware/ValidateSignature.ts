import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InvalidSignatureException  from 'App/Exceptions/InvalidSignatureException'

export default class ValidateSignature {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    if (request.hasValidSignature()) {
        await next();
		return;
    }
    throw new InvalidSignatureException;
  }
}
