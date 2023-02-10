import { BaseModel, LucidModel, LucidRow } from "@ioc:Adonis/Lucid/Orm";
import { NormalizeConstructor } from '@ioc:Adonis/Core/Helpers'
import  User from "App/Models/User";
import Drive from '@ioc:Adonis/Core/Drive';


const HasProfilePhoto = <T extends NormalizeConstructor<typeof BaseModel>>(superclass:T)=>{

	return class extends superclass{

		public async updateProfilePhoto(this:User,photo:any):Promise<void>{
			let prevPhoto = this.profilePhotoPath;
			await photo.moveToDisk('./');
			this.profilePhotoPath = photo.fileName;
			await this.save();
			if(prevPhoto){
				await Drive.delete(prevPhoto);
			}

		}

		public async deleteProfilePhoto(this:User):Promise<void>
		{

			if (!this.profilePhotoPath) {
				return;
			}
			await Drive.delete(this.profilePhotoPath);
			this.profilePhotoPath = null;
			await this.save();

		}

		public defaultProfilePhotoUrl(this:User):string
		{

			let name = this.name.split(' ').map(segment=>{
				return segment.substring(0,1);
			}).join(' ').trim();

			return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&color=7F9CF5&background=EBF4FF`;
		}
	}
}

export default HasProfilePhoto;


