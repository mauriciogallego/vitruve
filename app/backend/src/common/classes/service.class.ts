import { InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { IPaginatedResult, IPaginationArgs } from '../../interfaces/types';

export abstract class Service {
  constructor(readonly prisma: PrismaService) {}

  async paginate<T>(
    model: string,
    query,
    pagination: IPaginationArgs<object>
  ): Promise<IPaginatedResult<T>> {
    try {
      const { skip = 0, take = 100, includeCount = true } = pagination;
      const transactions = [
        this.prisma[model].findMany({ ...query, skip, take }),
      ];

      if (includeCount) {
        transactions.push(this.prisma[model].count({ where: query.where }));
      }

      const [results, count] = await Promise.all(transactions);

      return {
        results,
        pagination: {
          total: includeCount ? count : undefined,
          size: results.length,
          skip,
          take,
          hasMore: includeCount ? skip + take < count : undefined,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: `There was an error retrieving ${model} list.
        Query args: ${JSON.stringify(query)}`,
        error,
      });
    }
  }

  async get<T>(model: string, findArgs): Promise<Awaited<T>> {
    try {
      const result = await this.prisma[model].findUnique(findArgs);
      return result;
    } catch (error) {
      throw new InternalServerErrorException({
        message: `There was an error retrieving ${model}`,
        error,
      });
    }
  }

  async getFirst(model: string, findArgs) {
    try {
      const result = await this.prisma[model].findFirst(findArgs);
      return result;
    } catch (error) {
      throw new InternalServerErrorException({
        message: `There was an error retrieving ${model}`,
        error,
      });
    }
  }
}
