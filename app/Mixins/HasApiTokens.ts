import { BaseModel } from "@ioc:Adonis/Lucid/Orm";
import { NormalizeConstructor } from '@ioc:Adonis/Core/Helpers'

const HasApiTokens= <T extends NormalizeConstructor<typeof BaseModel>>(superclass:T)=>{

	return class extends superclass{

		public  create():void{
			console.log(this);
		}


	}
}

export default HasApiTokens;
