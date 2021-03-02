# Azure observability: Logging frontend errors to Application Insights

**Ingest logs from another application to a central, serverless monitoring resource in Azure.**

Azure has some great observability tools when working with distributed applications.

This repo shows a way to ingest logs from another application—for example a frontend app—to a central monitoring resource: the one this code lets you deploy.

This specific example is very lightweight so adjust it for whatever your use-case is!

The stack is:

- [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
- [Azure Monitor](https://azure.microsoft.com/en-us/services/monitor/)
- [Azure Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)
- [Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/) to contain the function app code

The code uses:

- [Serverless Framework](https://www.serverless.com) to package and deploy the application
- [Typescript](https://www.typescriptlang.org) and Node 12
- [Webpack](https://webpack.js.org) to bundle the code

## Instructions

### Prerequisites

- Azure account
- Logged into the Azure environment
- Sufficient credentials to set up required infrastructure

### Local development

_Azure Functions can be finicky so you'll need to use Node 12 or similar to get this to work._

Install dependencies with `npm install`, then run `sls offline`. You can now start sending API requests to a local version of the API.

I've also added a tiny HTML page ("mini app") to fire events if you need. You can find it under the `app` folder.

### Build and deploy

Run `sls deploy`.

## See logs and metrics

The easiest way to see what comes in is `Live metrics` and `Transaction search` in the Application Insights pane. You can also use the other tools in the "Monitoring" category of Application Insights.

## API call examples

### Error

```
POST http://localhost:7071/api/log
{
	"severity": "error",
	"message": "Something caused an error to be thrown!",
	"error": "{\"stack\":\"Error: Something caused an error to be thrown!\n    at log (file:///Users/username/logs/app/index.html:32:25)\n    at HTMLButtonElement.<anonymous> (file:///Users/username/logs/app/index.html:38:80)\",\"message\":\"Something caused an error to be thrown!\"}"
}
```

### Warning

```
POST http://localhost:7071/api/log
{
	"severity": "warn",
	"message": "Whoops, this was awkward. Time for a warning :(",
	"error": "{\"stack\":\"Error: Whoops, this was awkward. Time for a warning :(\n    at log (file:///Users/username/logs/app/index.html:32:25)\n    at HTMLButtonElement.<anonymous> (file:///Users/username/logs/app/index.html:39:79)\",\"message\":\"Whoops, this was awkward. Time for a warning :(\"}"
}
```

## References

- [Application Insights API for custom events and metrics](https://docs.microsoft.com/en-us/azure/azure-monitor/app/api-custom-events-metrics)
