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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const typeorm_2 = require("@nestjs/typeorm");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async update(id, dto) {
        const user = await this.byId(id);
        const isSameUser = await this.userRepository.findOneBy({ email: dto.email });
        if (isSameUser && id !== isSameUser.id)
            throw new common_1.BadRequestException('Email already exist');
        if (dto.password) {
            const salt = await (0, bcryptjs_1.genSalt)(12);
            user.password = await (0, bcryptjs_1.hash)(dto.password, salt);
        }
        user.email = dto.email;
        user.name = dto.name;
        user.password = dto.password;
        user.description = dto.description;
        user.avatarPath = dto.avatarPath;
        return this.userRepository.save(user);
    }
    async getProfile(id) {
        const checkUser = this.byId(id);
        if (!checkUser)
            throw new common_1.NotFoundException('User is not found');
        const profile = this.userRepository.findOne({
            where: { id: id },
            select: {
                email: true,
                name: true,
                description: true,
                avatarPath: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return profile;
    }
    async byId(id) {
        const user = await this.userRepository.findOne({
            where: { id: id },
            relations: { posts: true, subscribers: { toChannel: true } },
            order: { createdAt: 'DESC' }
        });
        if (!user)
            throw new common_1.NotFoundException('User is not found');
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map