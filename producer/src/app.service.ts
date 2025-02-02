import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9093'],
      },
      consumer: {
        groupId: 'ec-consumer',
      },
    },
  })
  client: ClientKafka;

  sendToStorage() {
    return this.client.emit('storage-ec', {
      message: 'remove item from storage',
    });
  }
}
