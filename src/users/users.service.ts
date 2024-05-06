import { inject, injectable } from "inversify";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./users.service.interface";
import "reflect-metadata";
import { TYPES } from "../types";
import { IConfigService } from "../config/config.service.interface";

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get("SALT");
		console.log(salt);
		await newUser.setPassword(password, Number(salt));
		// check is user already exists?
		// if yes - return null
		// else create new user and return it
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
