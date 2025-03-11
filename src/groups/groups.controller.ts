import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
  Query,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDTO } from './dto/create-group.dto';
import { UpdateGroupDTO } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDTO) {
    const { name } = createGroupDto;

    const groupExists = await this.prisma.group.findUnique({ where: { name } });
    if (groupExists) {
      throw new NotFoundException('Grupo com esse nome já existe');
    }

    return this.groupsService.create(createGroupDto);
  }

  @Get()
  async findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const group = await this.groupsService.findOne(id);
    if (!group) {
      throw new NotFoundException(`Grupo com ID ${id} não encontrado`);
    }
    return group;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDTO,
  ) {
    const group = await this.groupsService.findOne(id);
    if (!group) {
      throw new NotFoundException(`Grupo com ID ${id} não encontrado`);
    }

    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }

  // DELETE /groups?id=...
  @Delete()
  removeByQuery(@Query('id') id: string) {
    if (!id) {
      throw new NotFoundException('O parâmetro "id" é obrigatório na query');
    }
    return this.groupsService.remove(id);
  }
}
