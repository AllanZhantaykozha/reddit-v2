import { CommentEntity } from 'src/comment/comment.entity'
import { PostEntity } from 'src/post/post.entity'
import { Base } from 'src/utils/base.entity'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { SubscriptionEntity } from './subscription.entity'
import { ReactionEntity } from 'src/reaction/reaction.entity'

@Entity('User')
export class UserEntity extends Base {
	@Column({ unique: true })
	email: string

	@Column({ default: '' })
	name: string

	@Column({ select: false })
	password: string

	@Column({ default: '', type: 'text' })
	description: string

	@Column({ default: '', name: 'avatar_path' })
	avatarPath: string

	@OneToMany(() => PostEntity, post => post.author)
	posts: PostEntity

	@OneToMany(() => CommentEntity, post => post.user)
	comment: CommentEntity

	@OneToMany(() => SubscriptionEntity, subscripions => subscripions.fromUser)
	subscripions: SubscriptionEntity

	@OneToMany(() => SubscriptionEntity, subscribers => subscribers.toChannel)
	subscribers: SubscriptionEntity

	@OneToMany(() => ReactionEntity, reaction => reaction.user)
	reactions: ReactionEntity
}
