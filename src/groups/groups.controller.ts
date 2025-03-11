import { Body, Controller, Get, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDTO } from './dto/create-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  // Rota para criar um grupo
  @Post()
  async create(@Body() createGroupDTO: CreateGroupDTO) {
    return this.groupsService.create(createGroupDTO);
  }

  // Rota para listar todos os grupos
  @Get()
  async findAll() {
    return this.groupsService.findAll();
  }
}
