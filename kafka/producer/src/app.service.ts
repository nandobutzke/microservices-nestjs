/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from "@nestjs/common";
import { Client, ClientKafka, Transport } from "@nestjs/microservices";

@Injectable()
export class AppService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ["localhost:9093"],
      },
      consumer: {
        groupId: "ec-consumer",
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf("storage-ec");
    await this.client.connect();
  }

  sendToStorage() {
    return this.client.send("storage-ec", {
      message: "remove item from storage",
    });
  }
}
