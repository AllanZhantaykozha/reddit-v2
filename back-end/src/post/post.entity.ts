import { CommentEntity } from 'src/comment/comment.entity'
import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base.entity'
import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany
} from 'typeorm'

@Entity('Post')
export class PostEntity extends Base {
	@Column({ unique: true })
	title: string

	@Column('text', { array: true, nullable: true })
	images?: string[]

	@Column({ unique: true })
	content: string

	@ManyToOne(() => UserEntity, user => user.posts)
	@JoinColumn({ name: 'author_id' })
	author: UserEntity

	@Column({ default: 0 })
	likesCount?: number

	@Column({ default: 0 })
	dislikesCount?: number

	@Column({ default: 0 })
	viewsCount: number

	@Column('text', { array: true, nullable: true })
	tags?: string[]

	@OneToMany(() => CommentEntity, comment => comment.user)
	comments: CommentEntity
}
