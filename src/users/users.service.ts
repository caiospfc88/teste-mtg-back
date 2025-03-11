import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        isActive: createUserDto.isActive ?? true,
        groups: createUserDto.groups
          ? {
              create: createUserDto.groups.map((groupId) => ({
                group: { connect: { id: groupId } },
              })),
            }
          : undefined,
      },
      include: {
        groups: { include: { group: true } },
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        groups: { include: { group: true } },
        ownedGroups: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        groups: { include: { group: true } },
        ownedGroups: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }
  async update(id: string, updateUserDto: UpdateUserDTO) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    const { groups, ...userData } = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        groups: groups
          ? {
              set: groups.map((groupId) => ({
                userId_groupId: {
                  userId: id,
                  groupId,
                },
              })),
            }
          : undefined,
      },
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { ownedGroups: true }, // Busca os grupos que ele possui
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    if (user.ownedGroups.length > 0) {
      throw new BadRequestException(
        `Usuário ${user.name} não pode ser excluído porque ainda é responsavel por grupos`,
      );
    }

    await this.prisma.userGroup.deleteMany({
      where: { userId: id },
    });

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
