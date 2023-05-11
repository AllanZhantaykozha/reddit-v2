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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        return {
            user: this.returnUserFields(user),
            accessToken: await this.accessToken(user.id)
        };
    }
    async register(dto) {
        const checkEmail = await this.userRepository.findOneBy({ email: dto.email });
        if (checkEmail)
            throw new common_1.BadRequestException('Email already busy');
        const salt = await (0, bcryptjs_1.genSalt)(12);
        const newUser = this.userRepository.create({
            email: dto.email,
            password: await (0, bcryptjs_1.hash)(dto.password, salt)
        });
        const user = await this.userRepository.save(newUser);
        return {
            user: this.returnUserFields(user),
            accessToken: await this.accessToken(user.id)
        };
    }
    async validateUser(dto) {
        const user = await this.userRepository.findOne({
            where: { email: dto.email },
            select: ['id', 'email', 'password']
        });
        if (!user)
            throw new common_1.NotFoundException('User is not found');
        const isValidPassword = await (0, bcryptjs_1.compare)(dto.password, user.password);
        if (!isValidPassword)
            throw new common_1.UnauthorizedException('Incorrect password');
        return user;
    }
    async accessToken(userId) {
        const data = { id: userId };
        return await this.jwtService.signAsync(data, { expiresIn: '31d' });
    }
    returnUserFields(user) {
        return {
            email: user.email,
            password: user.password
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map