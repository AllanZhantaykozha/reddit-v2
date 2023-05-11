import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { AuthDto } from './auth.dto'
import { compare, genSalt, hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		return {
			user: this.returnUserFields(user),
			accessToken: await this.accessToken(user.id)
		}
	}

	async register(dto: AuthDto) {
		const checkEmail = await this.userRepository.findOneBy({ email: dto.email })

		if (checkEmail) throw new BadRequestException('Email already busy')

		const salt = await genSalt(12)

		const newUser = this.userRepository.create({
			email: dto.email,
			password: await hash(dto.password, salt)
		})

		const user = await this.userRepository.save(newUser)

		return {
			user: this.returnUserFields(user),
			accessToken: await this.accessToken(user.id)
		}
	}

	async validateUser(dto: AuthDto) {
		const user = await this.userRepository.findOne({
			where: { email: dto.email },
			select: ['id', 'email', 'password']
		})

		if (!user) throw new NotFoundException('User is not found')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Incorrect password')

		return user
	}

	async accessToken(userId: number) {
		const data = { id: userId }

		return await this.jwtService.signAsync(data, { expiresIn: '31d' })
	}

	returnUserFields(user: UserEntity) {
		return {
			email: user.email,
			password: user.password
		}
	}
}
