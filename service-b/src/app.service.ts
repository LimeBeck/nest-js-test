import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClientGrpc } from '@nestjs/microservices';
import { v4 as uuid4 } from 'uuid'
import debug from './debug';
import { Observable } from 'rxjs';

interface PingPongService {
  ping({id: string}): Observable<{id: string, timestamp: Date}>
}

@Injectable()
export class AppService implements OnModuleInit {
  private service: PingPongService;
  private readonly logger = new Logger(AppService.name);

  constructor(@Inject('PING_PONG') private client: ClientGrpc) { }

  onModuleInit() {
    this.service = this.client.getService<PingPongService>('PingPong');
  }

  @Cron(CronExpression.EVERY_SECOND)
  async handleCron() {
    this.logger.debug(`<5b561c7a> Cron is triggered`)
    const response = await this.service.ping({ id: uuid4() }).toPromise()
    this.logger.debug(`<4078e264> Respond: ${debug(response)}`)
  }
}
