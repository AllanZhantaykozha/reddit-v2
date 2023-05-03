"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConfig = void 0;
const getTypeOrmConfig = async (configService) => ({
    type: 'postgres',
    host: configService.get('HOST'),
    port: configService.get('PORT'),
    username: configService.get('USER'),
    password: configService.get('PASSWORD'),
    database: configService.get('DB'),
    autoLoadEntities: true,
    synchronize: true,
});
exports.getTypeOrmConfig = getTypeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map