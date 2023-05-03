import { CommentEntity } from 'src/comment/comment.entity';
import { PostEntity } from 'src/post/post.entity';
import { Base } from 'src/utils/base.entity';
import { SubscriptionEntity } from './subscription.entity';
import { ReactionEntity } from 'src/reaction/reaction.entity';
export declare class UserEntity extends Base {
    email: string;
    name: string;
    password: string;
    description: string;
    avatarPath: string;
    posts: PostEntity;
    comment: CommentEntity;
    subscripions: SubscriptionEntity;
    subscribers: SubscriptionEntity;
    reactions: ReactionEntity;
}
