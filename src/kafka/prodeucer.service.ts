import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka,Producer,ProducerRecord } from 'kafkajs';

@Injectable()
export class ProdeucerService implements OnModuleInit {
  private readonly kafka = new Kafka({
    brokers: ['DESKTOP-82T96U7:9092'],
  });
  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record:ProducerRecord){
    for (let index = 0; index < 100000; index++) {
     await this.producer.send(record)
    }
  }

  async onApplicationShutdown(signal?:string){
     this.producer.disconnect()
  }
}
