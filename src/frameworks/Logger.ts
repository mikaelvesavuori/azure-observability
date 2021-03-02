import { LogEvent } from '../contracts/Log';

import appInsights = require('applicationinsights'); // NOTE: The "require"-style import is the only way I got this actually working...

const INSTRUMENTATION_KEY =
  process.env.APPINSIGHTS_INSTRUMENTATIONKEY || 'b427b36f-9918-4c53-b02b-69c949531f6b';

export const createLogger = (): Logger => new Logger();

class Logger {
  client: appInsights.TelemetryClient;

  constructor() {
    appInsights
      .setup(INSTRUMENTATION_KEY)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true, true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      .setSendLiveMetrics(false)
      .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
      .start();

    this.client = appInsights.defaultClient;
  }

  /**
   * @description Create a regular log, and also use the App Insights client to create an exception and a trace.
   * @see https://docs.microsoft.com/en-us/azure/azure-monitor/app/api-custom-events-metrics
   */
  log(event: LogEvent) {
    const { severity, message, error } = event;

    console.log(`Recorded log with severity "${severity}" and message "${message}"`);

    this.client.trackException({
      exception: new Error(error)
    });

    this.client.trackTrace({ message });

    /*
    // More examples...

    client.trackEvent({
      name: 'my custom event',
      properties: { customProperty: 'custom property value' }
    });

    client.trackMetric({ name: 'custom metric', value: 3 });

    client.trackDependency({
      target: 'http://dbname',
      name: 'select customers proc',
      data: 'SELECT * FROM Customers',
      duration: 231,
      resultCode: 0,
      success: true,
      dependencyTypeName: 'ZSQL'
    });

    client.trackRequest({
      name: 'GET /customers',
      url: 'http://myserver/customers',
      duration: 309,
      resultCode: 200,
      success: true
    });
    */
  }
}
