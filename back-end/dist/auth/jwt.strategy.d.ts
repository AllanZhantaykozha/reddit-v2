import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-jwt';
import { UserEntity } from 'src/user/user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userRepository;
    constructor(configService: ConfigService, userRepository: Repository<UserEntity>);
    validate({ id }: Pick<UserEntity, 'id'>): Promise<UserEntity[]>;
}
export {};
