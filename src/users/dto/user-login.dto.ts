import { IsEmail, IsString } from "class-validator";

export class UserLoginDto {
	@IsEmail({}, { message: "Incorrect email" })
	email: string;

	@IsString({ message: "Password must be a string" })
	password: string;
}
