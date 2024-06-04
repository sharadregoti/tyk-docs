---
title: Getting Started
description: Guide for how to quickly get started using Tyk Streaming
tags: [ "streaming", "getting started" ]
---

This guide will walk you through setting up Tyk Streams and configuring your first async API.

## Prerequisites

To get started with Tyk Streams, you will need:
- Docker installed on your machine
- The following Docker images:
    - [tykio/portal:v1.10.0-alpha2](https://hub.docker.com/r/tykio/portal/tags?page=&page_size=&ordering=&name=v1.10.0-alpha2)
    - [tykio/tyk-dashboard:s5.4.0-alpha1](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=&page_size=&ordering=&name=s5.4.0-alpha1)
    - [tykio/tyk-gateway:v5.4.0-alpha5](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=&page_size=&ordering=&name=s5.4.0-alpha5)

- A WebSocket testing tool like [wscat](https://github.com/websockets/wscat) for testing your async APIs

## Configuring a Basic Async API

In the Tyk Dashboard, create a new API and select the *Open API* option.

{{< img src="/img/streams/create-new-api.png" alt="Create New API" width="1000px" >}}

Select *Active* from the *Gateway Status* drop-down list and then select *External* from the *Access* drop-down list.

Navigate to the *Streaming* section and click on *Add Stream*.

{{< img src="/img/streams/streams.png" alt="Click the Add Stream button" width="1000px" >}}

Provide a name for your stream in the *Stream name* textbox

{{< img src="/img/streams/name-streams.png" alt="Add stream name" width="1000px" >}}

In the *Stream configuration*, define your stream input and output:

```yaml
input:
  http_server:
    path: /post
  label: example_generator_input
output:
  http_server:
    ws_path: /subscribe
  label: example_websocket_output
```

In the above configuration it can be seen that:

- Messages can be posted to the `/<listen-path>/post` endpoint
- Clients can subscribe to messages via WebSocket at the `/<listen-path>/subscribe` endpoint

Save your API definition.

## Testing Your Async API

Lets test the async API we just created.

Subscribe to the WebSocket using wscat:

```bash
wscat -c ws://localhost:8080/<listen-path>/subscribe
```

Post a message to the `/post` endpoint using curl:

```bash
curl -X POST -d '{"message":"Hello, Tyk Streams!"}' http://localhost:8080/<listen-path>/post
```

Verify that the message posted in step 1 is received in the *wscat* terminal.

## Debugging

If you encounter issues, here are a few things to check:
- Ensure all Docker containers are running correctly
- Verify the API definition is properly configured in the Tyk Dashboard
- Check the Tyk Gateway logs for any error messages

With this, you have successfully set up Tyk Streams and created your first async API! You can now start exploring more advanced configurations and use cases.
