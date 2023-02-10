import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'

Route.get('/', async ({ inertia, auth, request }) => {
	try{
		await auth.use('web').authenticate();
	}catch(err){
		console.log(err);
	}
	return inertia.render('Welcome',{
		'canLogin' : Route.has('login'),
        'canRegister' : Route.has('register'),
        'adonisVersion' : Application.adonisVersion!.toString(),
        'nodeVersion' : process.version,
	});
});
Route.get('/dashboard', async({inertia})=>{
    return inertia.render('Dashboard');
}).middleware(['auth'/*,'verified'*/]).as('dashboard');

Route.group(()=>{
	Route.get('/login','Auth/AuthenticatedSessionController.create').as('login');
	Route.post('login', 'Auth/AuthenticatedSessionController.store');

	Route.get('/register', 'Auth/RegisteredUserController.create').as('register');
	Route.post('/register', 'Auth/RegisteredUserController.store');

	Route.get('/forgot-password', 'Auth/PasswordResetLinkController.create').as('password.request');
	Route.post('/forgot-password', 'Auth/PasswordResetLinkController.store').as('password.email');

	Route.get('/reset-password/:token', 'Auth/NewPasswordController.create').as('password.reset');
    Route.post('/reset-password', 'Auth/NewPasswordController.store').as('password.store');

}).middleware('guest');

Route.group(()=>{
	Route.get('/verify-email', 'Auth/EmailVerificationPromptController.index').as('verification.notice');
	Route.get('/verify-email/:id/:hash', 'Auth/VerifyEmailController.index')
		.middleware(['throttle:main','signed'])
		.as('verification.verify');
	Route.post('/email/verification-notification', 'Auth/EmailVerificationNotificationController.store').as('verification.send');
	Route.get('/confirm-password', 'Auth/ConfirmablePasswordController.show').as('password.confirm');
	Route.post('/confirm-password', 'Auth/ConfirmablePasswordController.store');
	Route.put('/password', 'Auth/PasswordController.update').as('password.update');
	Route.post('/logout','Auth/AuthenticatedSessionController.destroy').as('logout');
	Route.get('/profile', 'ProfileController.edit').as('profile.edit');//.middleware('password.confirm');
    Route.patch('/profile', 'ProfileController.update').as('profile.update');
    Route.delete('/profile', 'ProfileController.destroy').as('profile.destroy');
	Route.delete('/user/profile-photo', 'ProfileController.deleteProfilePhoto').as('current-user-photo.destroy');
}).middleware('auth');
