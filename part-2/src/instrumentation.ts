import { opentelemetry } from '@elysiajs/opentelemetry';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';

const traceExporter = new OTLPTraceExporter({
  url: Bun.env.OTEL_OTLP_ENDPOINT,
});

const spanProcessor = new BatchSpanProcessor(traceExporter);

export const instrumentation = opentelemetry({
  instrumentations: [new PgInstrumentation()],
  serviceName: Bun.env.OTEL_SERVICE_NAME,
  spanProcessors: [spanProcessor],
});
