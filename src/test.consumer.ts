import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private consumerSerice: ConsumerService) {}
  async onModuleInit() {
    await this.consumerSerice.consume(
      { topics: ['Users']},
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
          });
        },
      },
    );
  }
}
