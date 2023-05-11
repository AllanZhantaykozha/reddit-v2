import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(200)
	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.getProfile(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('update')
	@Auth()
	async update(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.update(id, dto)
	}

	@HttpCode(200)
	@Get(':id')
	@Auth()
	async byId(@Param('id') id: number) {
		return this.userService.byId(id)
	}
}
