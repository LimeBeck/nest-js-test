import { Injectable, Logger } from '@nestjs/common';

type Pong = {
  id: string,
  timestamp: Date
}

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getPong(id: string): Pong {
    this.logger.debug(`<1eff4043> Pong with id ${id}`)
    return {
      id,
      timestamp: new Date()
    };
  }
}
