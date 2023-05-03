import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { UserEntity } from './user.entity'
import { UserDto } from './user.dto'
import { Repository } from 'typeorm'
import { hash, genSalt } from 'bcryptjs'

@Injectable()
export class UserService {
	constructor(private readonly userRepository: Repository<UserEntity>) {}

	async update(id: number, dto: UserDto) {
		const user = await this.byId(id)
		const isSameUser = await this.userRepository.findOneBy({ email: dto.email })

		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email already exist')

		if (dto.password) {
			const salt = await genSalt(17)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email
		user.name = dto.name
		user.password = dto.password
		user.description = dto.description
		user.avatarPath = dto.avatarPath

		return this.userRepository.save(user)
	}

	async byId(id: number) {
		const user = await this.userRepository.findOne({
			where: { id: id },
			relations: { posts: true, subscribers: { toChannel: true } },
			order: { createdAt: 'DESC' }
		})

		if (!user) throw new NotFoundException('User not found')

		return user
	}
}
