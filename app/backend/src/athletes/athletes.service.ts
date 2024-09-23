import { Athlete, Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { IEntityService, IPaginationArgs } from '../interfaces/types';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { Service } from '../common/classes/service.class';
import { AthleteEntity } from './entities/athlete.entity';

@Injectable()
export class AthletesService extends Service implements IEntityService {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  findOne(id: string): Promise<AthleteEntity> {
    throw new Error(`Method not implemented. ${id}`);
  }

  async create(data: CreateAthleteDto) {
    return await this.prisma.athlete.create({
      data,
    });
  }

  async update(id: string, data: UpdateAthleteDto) {
    return await this.prisma.athlete.update({
      data,
      where: {
        id,
      },
    });
  }

  async findAll(params: IPaginationArgs<Prisma.AthleteFindManyArgs>) {
    const { includeCount, skip, take, ...findAllParams } = params;
    return this.paginate<Athlete>(
      'athlete',
      {
        ...findAllParams,
      },
      { includeCount, skip, take }
    );
  }
}
