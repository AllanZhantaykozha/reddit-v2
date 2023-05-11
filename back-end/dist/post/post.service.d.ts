import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
export declare class PostService {
    private readonly postRepository;
    constructor(postRepository: Repository<PostEntity>);
    create(id: number): Promise<number>;
    update(id: number, dto: PostDto): Promise<{
        title: string;
        images: string[];
        content: string;
        tags: string[];
        author: import("../user/user.entity").UserEntity;
        likesCount?: number;
        dislikesCount?: number;
        viewsCount: number;
        comments: import("../comment/comment.entity").CommentEntity;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    } & PostEntity>;
    getAll(): Promise<PostEntity[]>;
    byId(id: number): Promise<PostEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    like(postId: number): Promise<PostEntity>;
    dislike(postId: number): Promise<PostEntity>;
    view(postId: number): Promise<PostEntity>;
}
