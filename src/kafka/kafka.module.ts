import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ConsumerService } from './consumer.service';
import { ProdeucerService } from './prodeucer.service';

@Module({
  providers: [ProdeucerService, ConsumerService, AdminService],
  exports: [ProdeucerService, ConsumerService, AdminService],
})
export class KafkaModule {}
