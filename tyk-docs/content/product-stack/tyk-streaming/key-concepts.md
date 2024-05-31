---
title: Key Concepts
description: Explains key concepts of streaming
tags: [ "streaming", "events", "event driven architecture", "event driven architectures", "kafka" ]
---

Architectural overview
- Tyk is now a intermediate broker between broker and subscribers
- Integrate with multiple brokers
- API Management hooks between publisher, gateway and subscriber (Events are availble as APIs)

Structure of a Tyk Stream Event

Terms
- Asynchronous
- Publish/subscribe
- Event notification
- Stream

- Infrastructure
    - Message queues (RabbitMQ, Kafka)
    - MQTT
    - Failure semantics, e.g. exactly-once, at-most-once, at-least-once

- Example application scenarios
    - IoT
    - Infrastructure for domain driven design, e.g. event bus to notify state changes between micro-services
