# NestJS Kafka Configuration Sample

A compact historical NestJS and KafkaJS project that demonstrates producer, consumer, and administrative Kafka operations inside injectable services.

## What it demonstrates

- Creating a KafkaJS producer during Nest application startup
- Registering a consumer and handling messages from a topic
- Using the Kafka administration client to list, create, and delete topics
- Sharing Kafka services through a Nest module
- Reading one or more broker addresses from environment configuration

## Technology

- Node.js and TypeScript
- NestJS 9
- KafkaJS 2
- Jest scaffolding

## Requirements

- Node.js 16 or newer for the historical dependency set
- A local or isolated Kafka broker

The repository does not include a Kafka broker, ZooKeeper, KRaft configuration, Docker Compose file, authentication setup, or TLS certificates.

## Configuration

Set a comma-separated broker list. The sample defaults to `localhost:9092` when this variable is absent.

```powershell
$env:KAFKA_BROKERS = "localhost:9092"
```

For multiple brokers:

```powershell
$env:KAFKA_BROKERS = "broker-one:9092,broker-two:9092"
```

Use only local or isolated development brokers. This sample does not configure SASL or TLS.

## Install and run

```powershell
npm install
npm run build
npm run start:dev
```

The application listens on port `5000`.

## Routes and behavior

| Method | Route | Historical behavior |
|---|---|---|
| `GET` | `/` | Sends the same `Hello World!` record to the `Users` topic 100,000 times sequentially |
| `GET` | `/delete` | Creates a sample topic, lists topics, and deletes the `Users` topic |

The consumer joins group `test`, subscribes to `Users`, and logs message values.

## Verification

```powershell
npm run build
npm test -- --runInBand --passWithNoTests
```

There are no committed automated tests. A meaningful integration test would require an isolated Kafka broker and bounded message counts.

## Historical limitations

This repository is an educational configuration sample, not a production service.

- The root route performs 100,000 sequential sends and can run for a long time.
- The deletion route performs destructive topic operations through `GET`.
- Topic names, group ID, client behavior, and message payloads are fixed in source.
- There is no authentication, authorization, input validation, retry policy, dead-letter handling, schema validation, idempotency strategy, or observability.
- Producer and consumer shutdown handling is incomplete.
- Administrative operations log directly to the console.
- The dependency graph is historical and should be upgraded before deployment.

Do not expose the HTTP routes to untrusted traffic or point the sample at a shared or production Kafka cluster.

## Status

Archived educational sample retained as evidence of early KafkaJS and NestJS experimentation.

## License

No open-source license has been selected. The source is publicly viewable, but reuse rights are not granted until a license is added.
