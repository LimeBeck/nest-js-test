import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'ping_pong',
      url: "0.0.0.0:5000",
      protoPath: join(__dirname, 'proto/schemas/ping-pong.proto'),
    },
  });
  await app.listen();
}
bootstrap();
