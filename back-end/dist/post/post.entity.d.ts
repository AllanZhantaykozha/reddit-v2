import { CommentEntity } from 'src/comment/comment.entity';
import { ReactionEntity } from 'src/reaction/reaction.entity';
import { TagsEntity } from 'src/tags/tags.entity';
import { UserEntity } from 'src/user/user.entity';
import { Base } from 'src/utils/base.entity';
export declare class PostEntity extends Base {
    title: string;
    images: string[];
    content: string;
    author: UserEntity;
    tags: TagsEntity;
    reactions: ReactionEntity;
    comments: CommentEntity;
}
