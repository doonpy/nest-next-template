import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseFactory } from './DatabaseFactory';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseFactory = new DatabaseFactory(configService);

        return databaseFactory.getMySqlFactory();
      }
    })
  ]
})
export default class Database {}
