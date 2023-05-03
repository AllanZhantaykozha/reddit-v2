import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    update(id: number, dto: UserDto): Promise<UserEntity>;
    byId(id: number): Promise<UserEntity>;
}
