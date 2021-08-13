import { INestApplication } from '@nestjs/common';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { ping_pong } from '../src/proto/generated/rpc';

describe('GRPC Test', () => {
  let app: INestApplication;
  let client: ClientGrpc;
  let service: ping_pong.PingPong

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.register([{
        name: "testClient",
        transport: Transport.GRPC as any,
        options: {
          package: 'ping_pong',
          url: "0.0.0.0:5001",
          protoPath: join(__dirname, '../src/proto/schemas/ping-pong.proto'),
        },
      }])],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();

    app.connectMicroservice({
      transport: Transport.GRPC,
      options: {
        package: 'ping_pong',
        url: "0.0.0.0:5001",
        protoPath: join(__dirname, '../src/proto/schemas/ping-pong.proto'),
      },
    });
    // Start gRPC microservice
    await app.startAllMicroservices();
    await app.init();
    client = app.get("testClient") as ClientGrpc
    service = client.getService<ping_pong.PingPong>("PingPong")
  });

  describe('Ping-Pong', () => {
    it('should return same id and some timestamp', async () => {
      let response = await service.ping({id: "test"})
      expect(response.id).toBe("test")
      expect(response.timestamp).toBeDefined()
    });
  }); 
});
