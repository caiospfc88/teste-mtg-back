import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UsersModule, GroupsModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
