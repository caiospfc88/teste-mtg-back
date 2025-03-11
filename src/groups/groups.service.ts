import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDTO } from './dto/create-group.dto';
import { AddUserToGroupDTO } from '../user-group/dto/add-user-to-group.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDTO) {
    return this.prisma.group.create({
      data: {
        name: createGroupDto.name,
        owner: { connect: { id: createGroupDto.ownerId } },
      },
      include: { owner: true },
    });
  }

  async findAll() {
    return this.prisma.group.findMany({
      include: {
        owner: true,
        users: {
          include: { user: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: {
        owner: true,
        users: { include: { user: true } },
      },
    });

    if (!group) {
      throw new NotFoundException(`Grupo com ID ${id} não encontrado`);
    }

    return group;
  }

  async addUserToGroup(addUserToGroupDto: AddUserToGroupDTO) {
    const { userId, groupId } = addUserToGroupDto;

    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
    if (!group) {
      throw new NotFoundException(`Grupo com ID ${groupId} não encontrado`);
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    return this.prisma.userGroup.create({
      data: {
        userId,
        groupId,
      },
    });
  }

  removeUserFromGroup(userId: string, groupId: string) {
    return this.prisma.userGroup.delete({
      where: {
        userId_groupId: { userId, groupId },
      },
    });
  }
}
