import { CommentEntity } from 'src/comment/comment.entity'
import { ReactionEntity } from 'src/reaction/reaction.entity'
import { TagsEntity } from 'src/tags/tags.entity'
import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base.entity'
import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany
} from 'typeorm'

@Entity('Post')
export class PostEntity extends Base {
	@Column({ unique: true })
	title: string

	@Column()
	images: string[]

	@Column({ unique: true })
	content: string

	@ManyToOne(() => UserEntity, user => user.posts)
	@JoinColumn({ name: 'author_id' })
	author: UserEntity

	@ManyToMany(() => TagsEntity, tag => tag.post)
	@JoinTable()
	tags: TagsEntity

	@OneToMany(() => ReactionEntity, react => react.post)
	reactions: ReactionEntity

	@OneToMany(() => CommentEntity, comment => comment.user)
	comments: CommentEntity
}
