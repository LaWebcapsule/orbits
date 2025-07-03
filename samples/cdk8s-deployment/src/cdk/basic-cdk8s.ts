import * as kplus from 'cdk8s-plus-32';
import { Construct } from 'constructs';
import { App, Chart, ChartProps, Cron } from 'cdk8s';

export class BasicChart extends Chart {
  ns : kplus.Namespace;
  cronJob : kplus.CronJob;

  constructor(scope: Construct, id: string, props: ChartProps = { }) {
    super(scope, id, props);

    this.ns = new kplus.Namespace(this, 'Namespace');

    this.cronJob = new kplus.CronJob(this, 'CronJob', {
      metadata: {
        namespace: this.ns.name,
      },
      containers: [{
        image: 'hello-world',
      }],
      schedule: Cron.schedule({
        minute: '0',   // at minute 0
        hour: '10',    // at 10 am
        day: '*',      // every day of the month
        month: '*',    // every month
        weekDay: '*',  // every day of the week
      }),
    });
  }
}