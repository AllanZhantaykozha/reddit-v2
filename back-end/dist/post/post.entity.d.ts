import { CommentEntity } from 'src/comment/comment.entity';
import { UserEntity } from 'src/user/user.entity';
import { Base } from 'src/utils/base.entity';
export declare class PostEntity extends Base {
    title: string;
    images?: string[];
    content: string;
    author: UserEntity;
    likesCount?: number;
    dislikesCount?: number;
    viewsCount: number;
    tags?: string[];
    comments: CommentEntity;
}
