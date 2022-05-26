import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from '~/modules/app';
import { PrismaService } from '~/services/prisma';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe());
  await app.get(PrismaService).enableShutdownHooks(app);
  await app.listen(4000, '0.0.0.0');
}
bootstrap();
