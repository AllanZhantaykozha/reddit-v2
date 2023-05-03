import { Module } from '@nestjs/common'
import { ReactionService } from './reaction.service'
import { ReactionController } from './reaction.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReactionEntity } from './reaction.entity'

@Module({
	controllers: [ReactionController],
	providers: [ReactionService],
	imports: [TypeOrmModule.forFeature([ReactionEntity])]
})
export class ReactionModule {}
