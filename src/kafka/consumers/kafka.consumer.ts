import { QueueEnum } from "../enum/queue.enum";
import { InjectQueue, OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { ProcessEnum } from "../enum/process.enum";

@Processor(QueueEnum.QUEUE_KAFKA)
export class KafkaConsumer {

    constructor(
        @InjectQueue(QueueEnum.QUEUE_KAFKA) private queueKafka: Queue,
    ) { }

    @OnQueueCompleted()
    onActive(job: Job) {
        this.queueKafka.getJob(job.id).then(async data => {
            await data.remove();
        })
    }

    @Process(ProcessEnum.TEST_KAFKA)
    async sendEmail(job: Job<string>) {
        try {
            console.log(job.data)
        } catch (e) {
            console.log("An Error Has Occured");
            console.log(e);
        } finally {
            console.log("THE END");
        }
    }

}