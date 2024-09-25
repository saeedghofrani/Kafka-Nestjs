import { Injectable } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService {
  private readonly kafka = new Kafka({
    brokers: ['DESKTOP-82T96U7:9092'],
  });
  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: 'test' });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
    
  }

  async onApplicationShutdown(signal?: string) {
    for (const cosumer of this.consumers) {
     console.log(cosumer);

      await cosumer.disconnect();
    }
  }
}
