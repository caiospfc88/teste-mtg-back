import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    try {
      console.log('teste', createUserDTO);
      return await this.usersService.create(createUserDTO);
    } catch (error) {
      throw new BadRequestException(error.message || 'Erro ao criar usuário');
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
