import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { UserEntity } from './user.entity'
import { UserDto } from './user.dto'
import { Repository } from 'typeorm'
import { hash, genSalt } from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async update(id: number, dto: UserDto) {
		const user = await this.byId(id)
		const isSameUser = await this.userRepository.findOneBy({ email: dto.email })

		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email already exist')

		if (dto.password) {
			const salt = await genSalt(12)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email
		user.name = dto.name
		user.password = dto.password
		user.description = dto.description
		user.avatarPath = dto.avatarPath

		return this.userRepository.save(user)
	}

	async getProfile(id: number) {
		const checkUser = this.byId(id)

		if (!checkUser) throw new NotFoundException('User is not found')

		const profile = this.userRepository.findOne({
			where: { id: id },
			select: {
				email: true,
				name: true,
				description: true,
				avatarPath: true,
				createdAt: true,
				updatedAt: true
			}
		})

		return profile
	}

	async byId(id: number) {
		const user = await this.userRepository.findOne({
			where: { id: id },
			relations: { posts: true, subscribers: { toChannel: true } },
			order: { createdAt: 'DESC' }
		})

		if (!user) throw new NotFoundException('User is not found')

		return user
	}
}
