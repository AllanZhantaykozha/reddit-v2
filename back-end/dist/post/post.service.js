"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./post.entity");
const typeorm_2 = require("typeorm");
let PostService = class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async create(id) {
        const newPost = this.postRepository.create({
            title: '',
            images: [''],
            author: { id: id },
            content: '',
            tags: ['']
        });
        const post = await this.postRepository.save(newPost);
        return post.id;
    }
    async update(id, dto) {
        const post = await this.byId(id);
        return this.postRepository.save(Object.assign(Object.assign({}, post), dto));
    }
    async getAll() {
        const posts = await this.postRepository.find();
        return posts;
    }
    async byId(id) {
        const post = await this.postRepository.findOneBy({ id: id });
        if (!post)
            throw new common_1.NotFoundException('Post does not exist');
        return post;
    }
    async delete(id) {
        const post = await this.byId(id);
        if (!post)
            throw new common_1.NotFoundException('Post does not exist');
        return this.postRepository.delete({ id: id });
    }
    async like(postId) {
        const post = await this.byId(postId);
        post.likesCount++;
        return await this.postRepository.save(post);
    }
    async dislike(postId) {
        const post = await this.byId(postId);
        post.dislikesCount++;
        return await this.postRepository.save(post);
    }
    async view(postId) {
        const post = await this.byId(postId);
        post.viewsCount++;
        return await this.postRepository.save(post);
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map