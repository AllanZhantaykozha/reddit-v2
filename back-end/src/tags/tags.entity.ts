import { PostEntity } from 'src/post/post.entity'
import { Base } from 'src/utils/base.entity'
import { Column, Entity, ManyToMany } from 'typeorm'

@Entity('Tags')
export class TagsEntity extends Base {
	@Column({ unique: true })
	title: string

	@ManyToMany(() => PostEntity, post => post.tags)
	post: PostEntity
}
