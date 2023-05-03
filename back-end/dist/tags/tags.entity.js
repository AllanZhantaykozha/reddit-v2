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
exports.TagsEntity = void 0;
const post_entity_1 = require("../post/post.entity");
const base_entity_1 = require("../utils/base.entity");
const typeorm_1 = require("typeorm");
let TagsEntity = class TagsEntity extends base_entity_1.Base {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], TagsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => post_entity_1.PostEntity, post => post.tags),
    __metadata("design:type", post_entity_1.PostEntity)
], TagsEntity.prototype, "post", void 0);
TagsEntity = __decorate([
    (0, typeorm_1.Entity)('Tags')
], TagsEntity);
exports.TagsEntity = TagsEntity;
//# sourceMappingURL=tags.entity.js.map