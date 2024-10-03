import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@vitruve/backend/app/app.module';
import { PrismaService } from '@vitruve/backend/database/prisma.service';
import { cleanData } from '../utils/clearData';
import { Role, User } from '@prisma/client';
import { createUserAndToken } from '../utils/users';

describe('AthletesController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let admin: { user: User; token: string };
  let finalUser: { user: User; token: string };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    );

    prisma = app.get(PrismaService);
    await app.init();

    admin = await createUserAndToken(prisma, {
      email: 'new-admin@mail.com',
      password: '123456',
      role: Role.ADMIN,
      active: true,
    });

    finalUser = await createUserAndToken(prisma, {
      email: 'new-user@mail.com',
      password: '123456',
      role: Role.USER,
      active: true,
    });

    await prisma.athlete.createMany({
      data: [
        {
          name: 'andres',
          team: 'bolivar',
          age: 21,
        },
        {
          name: 'felipe',
          team: 'bolivar',
          age: 22,
        },
        {
          name: 'carlos',
          team: 'mexico',
          age: 23,
        },
      ],
    });
  });

  afterAll(async () => {
    await cleanData(prisma, app);
  });

  describe('/v1/athletes (GET)', () => {
    it('/v1/athletes (GET) (admin)', async () => {
      await request(app.getHttpServer())
        .get('/v1/athletes')
        .set('Authorization', `Bearer ${admin.token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body.results).toBeInstanceOf(Array);
          res.body.results.forEach((item) => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('active');
            expect(item).toHaveProperty('age');
            expect(item).toHaveProperty('team');
            expect(item).toHaveProperty('createdAt');
            expect(item).toHaveProperty('updatedAt');
          });
          expect(res.body.pagination).toBeInstanceOf(Object);
          expect(res.body.pagination).toEqual({
            total: 3,
            take: 100,
            skip: 0,
            size: 3,
            hasMore: false,
          });
        });
    });

    it('/v1/athletes (GET) (final)', async () => {
      await request(app.getHttpServer())
        .get('/v1/athletes')
        .set('Authorization', `Bearer ${finalUser.token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body.results).toBeInstanceOf(Array);
          res.body.results.forEach((item) => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('active');
            expect(item).toHaveProperty('age');
            expect(item).toHaveProperty('team');
            expect(item).toHaveProperty('createdAt');
            expect(item).toHaveProperty('updatedAt');
          });
          expect(res.body.pagination).toBeInstanceOf(Object);
          expect(res.body.pagination).toEqual({
            total: 3,
            take: 100,
            skip: 0,
            size: 3,
            hasMore: false,
          });
        });
    });
  });
});
