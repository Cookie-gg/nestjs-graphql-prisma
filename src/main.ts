import { NestFactory } from '@nestjs/core';
// import {
//   NestFastifyApplication,
//   FastifyAdapter,
// } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  // );
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // enable shutdown hooks of prisma
  await app.get(PrismaService).enableShutdownHooks(app);
  await app.listen(4000, '0.0.0.0');
}
bootstrap();
