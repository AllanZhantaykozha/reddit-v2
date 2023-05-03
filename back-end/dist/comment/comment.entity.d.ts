import { PostEntity } from 'src/post/post.entity';
import { UserEntity } from 'src/user/user.entity';
import { Base } from 'src/utils/base.entity';
export declare class CommentEntity extends Base {
    text: string;
    user: UserEntity;
    post: PostEntity;
}
