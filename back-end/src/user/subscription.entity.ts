import { Base } from 'src/utils/base.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('Subscription')
export class SubscriptionEntity extends Base {
	@ManyToOne(() => UserEntity, user => user.subscripions)
	fromUser: UserEntity

	@ManyToOne(() => UserEntity, user => user.subscribers)
	toChannel: UserEntity
}
