import { PostEntity } from 'src/post/post.entity'
import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity('Reaction')
export class ReactionEntity extends Base {
	@Column()
	state: boolean

	@ManyToOne(() => PostEntity, post => post.reactions)
	post: PostEntity

	@ManyToOne(() => UserEntity, user => user.reactions)
	user: UserEntity
}
