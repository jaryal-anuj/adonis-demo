import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, computed, afterFind } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers';
import HasProfilePhoto from 'App/Mixins/HasProfilePhoto';
import HasApiTokens from 'App/Mixins/HasApiTokens';
import Drive from '@ioc:Adonis/Core/Drive'
import Env from '@ioc:Adonis/Core/Env';



export default class User extends compose(BaseModel,HasApiTokens,HasProfilePhoto) {

	//public static namingStrategy = new CamelCaseNamingStrategy()

	@column({ isPrimary: true })
	public id: number

	@column()
	public name: string

	@column()
	public email: string

	@column({ serializeAs: null })
	public password: string

	@column()
	public rememberMeToken: string | null

	@column()
	public profilePhotoPath: string | null

	@computed({serializeAs:'profile_photo_url'})
	public profilePhotoUrl: string;

	@column.dateTime()
	public emailVerifiedAt:DateTime|null

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime


	@beforeSave()
	public static async hashPassword (user: User) {
		if (user.$dirty.password) {
		user.password = await Hash.make(user.password)
		}
	}

	@afterFind()
	public static async addPofilePhotoUrl(user:User){

		if(user.profilePhotoPath){
			let url = await Drive.getUrl(user.profilePhotoPath);
			url = Env.get('APP_URL')+url
			//this.$addColumn('profile_photo_url',{});
			user.profilePhotoUrl = url;
			return;
		}
		user.profilePhotoUrl = user.defaultProfilePhotoUrl();
	}




}

