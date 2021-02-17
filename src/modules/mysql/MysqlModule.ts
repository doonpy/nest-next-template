import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        url: process.env.MYSQL_URL,
        type: 'mysql',
        entities: [__dirname + '/**/*/entities/*{.ts,.js}'],
        logging: process.env.NODE_ENV !== 'production' ? ['error', 'query'] : ['error'],
        synchronize: true,
        autoLoadEntities: true,
        timezone: '+00:00',
        charset: 'utf8mb4_unicode_ci'
      })
    })
  ]
})
export default class MysqlModule {}
