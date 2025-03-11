import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  // Rota para criar um novo usuário
  @Post()
  async create(@Body() createUserDto: CreateUserDTO) {
    const { email } = createUserDto;

    // Verificando se o email já está em uso
    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw new NotFoundException('Email já está em uso');
    }

    return this.usersService.create(createUserDto);
  }

  // Rota para buscar todos os usuários
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Rota para buscar um usuário por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  // Rota para atualizar um usuário
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Atualizando o usuário
    return this.usersService.update(id, updateUserDto);
  }
}
