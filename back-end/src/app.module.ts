import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module'
import { CommentModule } from './comment/comment.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getTypeOrmConfig } from './config/typeorm.config'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig
		}),
		UserModule,
		PostModule,
		CommentModule,
		AuthModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
