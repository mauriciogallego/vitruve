import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Logger } from '../common/logger';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = Logger;

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.info('Database connected');
    } catch (err) {
      this.logger.error('Database connection failed', err);
    }
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
