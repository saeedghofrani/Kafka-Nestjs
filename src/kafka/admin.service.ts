import { Injectable } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class AdminService {
  private readonly admin = new Kafka({
    brokers: ['DESKTOP-82T96U7:9092'],
  }).admin();
  private readonly consumers: Consumer[] = [];

  async deleteRecords() {
    await this.admin.connect();
    await this.admin.createTopics({ topics: [{ topic: 'asdasdasd' }] }); // In order to create a topic
    //In order to list a topic
    // await this.admin.deleteTopics(topics) //In order to delete a topic
    const listTopic1 = await this.admin.listTopics();

    console.log('listTopic1', listTopic1);
    const result = await this.admin.deleteTopics({ topics: ['Users'] });
    const listTopic2 = await this.admin.listTopics();
    console.log('listTopic2', listTopic2.length);

    //     return listTopic;
  }
}

