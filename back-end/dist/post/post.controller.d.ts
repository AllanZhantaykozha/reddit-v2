import { PostService } from './post.service';
import { PostDto } from './post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
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
    } & import("./post.entity").PostEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    getAll(): Promise<import("./post.entity").PostEntity[]>;
    byId(id: number): Promise<import("./post.entity").PostEntity>;
    like(postId: number): Promise<import("./post.entity").PostEntity>;
    dislike(postId: number): Promise<import("./post.entity").PostEntity>;
    view(postId: number): Promise<import("./post.entity").PostEntity>;
}
