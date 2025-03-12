import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule], // Certifique-se de importar o AuthModule
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
