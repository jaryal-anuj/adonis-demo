/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'

validator.rule('currentPassword',async(value,[oldPassword],options)=>{
    if (typeof value !== 'string') {
        return
    }
    if (! await Hash.verify(oldPassword, value)) {
		console.log(await Hash.verify(oldPassword, value))

        options.errorReporter.report(
          options.pointer,
          'currentPassword',
          'The password is incorrect.',
          options.arrayExpressionPointer
        )
    }
},()=>{
	return{
		async:true
	}
});
