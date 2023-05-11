import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostEntity } from './post.entity'
import { Repository } from 'typeorm'
import { PostDto } from './post.dto'

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>
	) {}

	async create(id: number) {
		const newPost = this.postRepository.create({
			title: '',
			images: [''],
			author: { id: id },
			content: '',
			tags: ['']
		})

		const post = await this.postRepository.save(newPost)
		return post.id
	}

	async update(id: number, dto: PostDto) {
		const post = await this.byId(id)

		return this.postRepository.save({
			...post,
			...dto
		})
	}

	async getAll() {
		const posts = await this.postRepository.find()
		return posts
	}

	async byId(id: number) {
		const post = await this.postRepository.findOneBy({ id: id })

		if (!post) throw new NotFoundException('Post does not exist')

		return post
	}

	async delete(id: number) {
		const post = await this.byId(id)
		if (!post) throw new NotFoundException('Post does not exist')
		return this.postRepository.delete({ id: id })
	}

	async like(postId: number) {
		const post = await this.byId(postId)
		post.likesCount++

		return await this.postRepository.save(post)
	}

	async dislike(postId: number) {
		const post = await this.byId(postId)
		post.dislikesCount++
		return await this.postRepository.save(post)
	}

	async view(postId: number) {
		const post = await this.byId(postId)
		post.viewsCount++
		return await this.postRepository.save(post)
	}
}

// 660 жл 150 чел 2200 дер 30200 бет
