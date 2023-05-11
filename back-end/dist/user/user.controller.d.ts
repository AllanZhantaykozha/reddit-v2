import { UserService } from './user.service';
import { UserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(id: number): Promise<import("./user.entity").UserEntity>;
    update(id: number, dto: UserDto): Promise<import("./user.entity").UserEntity>;
    byId(id: number): Promise<import("./user.entity").UserEntity>;
}
