import { PostEntity } from 'src/post/post.entity'
import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity('Comment')
export class CommentEntity extends Base {
	@Column({ unique: true })
	text: string

	@ManyToOne(() => UserEntity, user => user.comment)
	user: UserEntity

	@ManyToOne(() => PostEntity, post => post.comments)
	post: PostEntity
}
