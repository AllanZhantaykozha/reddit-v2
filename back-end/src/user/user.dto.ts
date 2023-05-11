import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UserDto {
	@IsEmail()
	@IsOptional()
	email: string

	password?: string

	@IsString()
	name: string

	@IsString()
	description: string

	@IsString()
	avatarPath: string
}
