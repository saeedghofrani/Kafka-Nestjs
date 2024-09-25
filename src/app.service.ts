import { Injectable } from '@nestjs/common';
import { AdminService } from './kafka/admin.service';
import { ProdeucerService } from './kafka/prodeucer.service';

@Injectable()
export class AppService {
  constructor(private readonly produceService: ProdeucerService,
    private readonly adminService: AdminService) {}

  async sendData() {
      await this.produceService.produce({
        // for (let index = 0; index < 100; index++) {
        topic: 'Users',
        messages: [
          {
            value: 'Hello World!',
          },
        ],
  // }

      });
      return 'Hello World!';
    }
    async removeData() {
      await this.adminService.deleteRecords();
      return 'dleted';
    }
}
