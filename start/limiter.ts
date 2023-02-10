/*
|--------------------------------------------------------------------------
| Define HTTP rate limiters
|--------------------------------------------------------------------------
|
| The "Limiter.define" method callback receives an instance of the HTTP
| context you can use to customize the allowed requests and duration
| based upon the user of the request.
|
*/

import { Limiter } from '@adonisjs/limiter/build/services'

export const { httpLimiters } = Limiter
.define('main',(ctx)=>{
	console.log(ctx);
	return Limiter.allowRequests(6).every('1 min').limitExceeded((error) => {

		console.log(error);
        error.message = 'Rate limit exceeded'
        error.status = 429

        // A key-value pair of headers to set on the response
        console.log(error.headers)
    })
});
