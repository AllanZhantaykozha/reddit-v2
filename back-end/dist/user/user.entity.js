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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const comment_entity_1 = require("../comment/comment.entity");
const post_entity_1 = require("../post/post.entity");
const base_entity_1 = require("../utils/base.entity");
const typeorm_1 = require("typeorm");
const subscription_entity_1 = require("./subscription.entity");
let UserEntity = class UserEntity extends base_entity_1.Base {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', type: 'text' }),
    __metadata("design:type", String)
], UserEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', name: 'avatar_path' }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatarPath", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.PostEntity, post => post.author),
    __metadata("design:type", post_entity_1.PostEntity)
], UserEntity.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, post => post.user),
    __metadata("design:type", comment_entity_1.CommentEntity)
], UserEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subscription_entity_1.SubscriptionEntity, subscripions => subscripions.fromUser),
    __metadata("design:type", subscription_entity_1.SubscriptionEntity)
], UserEntity.prototype, "subscripions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subscription_entity_1.SubscriptionEntity, subscribers => subscribers.toChannel),
    __metadata("design:type", subscription_entity_1.SubscriptionEntity)
], UserEntity.prototype, "subscribers", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('User')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map