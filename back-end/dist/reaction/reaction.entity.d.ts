import { PostEntity } from 'src/post/post.entity';
import { UserEntity } from 'src/user/user.entity';
import { Base } from 'src/utils/base.entity';
export declare class ReactionEntity extends Base {
    state: boolean;
    post: PostEntity;
    user: UserEntity;
}
