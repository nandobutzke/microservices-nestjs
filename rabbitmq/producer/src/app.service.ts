import { Injectable } from '@nestjs/common';
import { Client, ClientRMQ, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'storage-ec',
      queueOptions: {
        durable: false,
      },
    },
  })
  client: ClientRMQ;

  sendToStorage() {
    return this.client.send('storage-ec', {
      message: 'remove item from storage',
    });
  }
}
