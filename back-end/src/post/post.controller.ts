import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PostService } from './post.service'
import { create } from 'domain'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { PostDto } from './post.dto'

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@HttpCode(200)
	@Auth()
	@Post()
	async create(@CurrentUser('id') id: number) {
		return this.postService.create(id)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth()
	@Put('update/:id')
	async update(@Param('id') id: number, @Body() dto: PostDto) {
		return this.postService.update(id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete('delete/:id')
	async delete(@Param('id') id: number) {
		return this.postService.delete(id)
	}

	@HttpCode(200)
	@Get()
	async getAll() {
		return this.postService.getAll()
	}

	@HttpCode(200)
	@Auth()
	@Get(':id')
	async byId(@Param('id') id: number) {
		return this.postService.byId(id)
	}

	@HttpCode(200)
	@Auth()
	@Post('like/:postId')
	async like(@Param('postId') postId: number) {
		return this.postService.like(postId)
	}

	@HttpCode(200)
	@Auth()
	@Post('dislike/:postId')
	async dislike(@Param('postId') postId: number) {
		return this.postService.dislike(postId)
	}

	@HttpCode(200)
	@Auth()
	@Post('view/:postId')
	async view(@Param('postId') postId: number) {
		return this.postService.view(postId)
	}
}
