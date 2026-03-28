import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from './entities/user.entity';
import { Contactus } from './entities/contactus.entity';
import { WinstonLoggerModule } from '../common/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Contactus]),
    WinstonLoggerModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
