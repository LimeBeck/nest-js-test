import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ping_pong } from './proto/generated/rpc';
import { google } from './proto/generated/rpc';

function timestampFromDate(date: Date): google.protobuf.ITimestamp {
  const time = date.getTime()
  return new google.protobuf.Timestamp({
    seconds: time / 1000,
    nanos: (time % 1000) * 1e6
  })
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('PingPong', 'ping')
  ping(data: ping_pong.Ping, metadata: Metadata, call: ServerUnaryCall<any, any>): ping_pong.Pong {
    const pong = this.appService.getPong(data.id)
    
    return new ping_pong.Pong({
      id: pong.id,
      timestamp: timestampFromDate(pong.timestamp)
    });
  }
}
