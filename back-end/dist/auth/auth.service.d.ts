import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    login(dto: AuthDto): Promise<{
        user: {
            email: string;
            password: string;
        };
        accessToken: string;
    }>;
    register(dto: AuthDto): Promise<{
        user: {
            email: string;
            password: string;
        };
        accessToken: string;
    }>;
    validateUser(dto: AuthDto): Promise<UserEntity>;
    accessToken(userId: number): Promise<string>;
    returnUserFields(user: UserEntity): {
        email: string;
        password: string;
    };
}
