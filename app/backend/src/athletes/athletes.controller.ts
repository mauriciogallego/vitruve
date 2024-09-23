import { Controller, Get, Param, Query, Post, Body, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AthletesService } from './athletes.service';
import { AthletesList } from './entities/athlete-list.entity';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { AthleteEntity } from './entities/athlete.entity';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { ListQueryArgsPipe } from '../common/pipes/ListQueryArgsPipe';
import { ListQueryArgsDto } from '../common/dto/list-query-args.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('athletes')
@ApiBearerAuth()
@Controller({
  path: 'athletes',
  version: '1',
})
export class AthletesController {
  constructor(private readonly athletesService: AthletesService) {}

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Get all athletes',
    description: 'Returns a list of athlete',
  })
  @Get()
  @Roles(Role.ADMIN, Role.USER)
  findAll(
    @Query(ListQueryArgsPipe) params: ListQueryArgsDto
  ): Promise<AthletesList> {
    return this.athletesService.findAll(params);
  }

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'create new athlete',
    description: 'allows to create new athletes',
  })
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() data: CreateAthleteDto): Promise<AthleteEntity> {
    return this.athletesService.create(data);
  }

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Update an athlete',
  })
  @Put(':id')
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateAthleteDto
  ): Promise<AthleteEntity> {
    return await this.athletesService.update(id, data);
  }
}
