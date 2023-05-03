import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('HOST'),
  port: configService.get('PORT'),
  username: configService.get('USER'),
  password: configService.get('PASSWORD'),
  database: configService.get('DB'),
  autoLoadEntities: true,
  synchronize: true,
});
