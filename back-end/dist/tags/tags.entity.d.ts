import { PostEntity } from 'src/post/post.entity';
import { Base } from 'src/utils/base.entity';
export declare class TagsEntity extends Base {
    title: string;
    post: PostEntity;
}
