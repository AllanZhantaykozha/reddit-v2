import { IsOptional, IsString } from 'class-validator'

export class PostDto {
	@IsString()
	title: string

	@IsString()
	@IsOptional()
	images: string[]

	@IsString()
	content: string

	@IsString()
	@IsOptional()
	tags: string[]
}
