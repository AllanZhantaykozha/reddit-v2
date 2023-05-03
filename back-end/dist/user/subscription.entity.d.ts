import { Base } from 'src/utils/base.entity';
import { UserEntity } from './user.entity';
export declare class SubscriptionEntity extends Base {
    fromUser: UserEntity;
    toChannel: UserEntity;
}
