import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { AppService } from './app.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'PING_PONG',
        transport: Transport.GRPC,
        options: {
          package: 'ping_pong',
          url: "service-a:5000",
          protoPath: join(__dirname, 'proto/schemas/ping-pong.proto'),
        },
      },
    ]),
  ],
  providers: [AppService],
})
export class AppModule { }
