import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { HonoAdapter, NestHonoApplication } from '@kiyasov/platform-hono';
import { AppModule } from './app/app.module';
import { PrismaService } from './database/prisma.service';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestHonoApplication>(
    AppModule,
    new HonoAdapter(),
    {
      rawBody: true,
      cors: true,
    }
  );
  const configService: ConfigService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  // Swagger setup
  if (process.env.NODE_ENV !== 'production') {
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: { persistAuthorization: true },
    };
    const config = new DocumentBuilder()
      .setTitle('Vitruve')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, customOptions);
  }

  // Prisma shutdown
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  // Start the server
  await app.listen(configService.get('port') as number);
}

bootstrap();
