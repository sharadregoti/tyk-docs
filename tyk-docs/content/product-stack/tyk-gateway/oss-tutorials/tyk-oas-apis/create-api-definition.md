---
title: Create Tyk OAS API Definition
description: ""
tags: [""]
---

There are two ways to configure Tyk Gateway with an API definition:

1. Create an API with the Tyk Gateway API - Tyk Gateway has its own APIs which provides various services including the registering of Tyk API Definitions on the Gateway.
2. Create an API in File-based Mode - alternatively you can create a Tyk API Definition in a file and then load it to the Gateway.


## Tutorial 1: Create a Tyk OAS API using the Tyk Gateway API

In this tutorial we show you how to create a minimal Tyk OAS API using the Tyk Gateway API, starting with a [Tyk OAS API Definition]({{< ref "/getting-started/using-oas-definitions/oas-glossary#tyk-oas-api-definition" >}}).

When making calls to the Tyk Gateway API you'll need to set the domain name and port for your environment and, in the API request header, must provide credentials in the `x-tyk-authorization` field for Tyk to authorise your request, as follows:

| Interface             | Port     |  Authorization Header  | Authorization credentials        |
|-----------------------|----------|------------------------|----------------------------------|
| Tyk Gateway API       | 8080     |  `x-tyk-authorization` | `secret` value set in `tyk.conf` |

To create the API in Tyk, you simply send your Tyk OAS API Definition to the `apis/oas` endpoint of your Tyk Gateway API.

| Property     | Description              |
|--------------|--------------------------|
| Resource URL | `/tyk/apis/oas`          |
| Method       | `POST`                   |
| Type         | None                     |
| Body         | Tyk OAS API Definition   |
| Parameters   | None                     |

Using [this](https://bit.ly/39tnXgO) minimal API definition it is possible to create a Tyk OAS API on your Tyk Gateway using only 30 lines:

```curl
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw
'{
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "components": {},
  "paths": {},
  "x-tyk-api-gateway": {
    "info": {
      "name": "Petstore",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "https://petstore.swagger.io/v2"
    },
    "server": {
      "listenPath": {
        "value": "/petstore/",
        "strip": true
      }
    }
  }
}'
```

### Check request response

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```yaml
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

What you have done is to send a Tyk OAS API definition to Tyk Gateway's `/apis/oas` endpoint resulting in the creation of the API in your Tyk Gateway. The Tyk OAS API definition object encapsulates all of the settings for a Tyk OAS API within your Tyk Gateway.

### Restart or hot reload

Once you have created your API you will want it to be loaded into the Gateway so that it can serve traffic. To do this you simply restart the Tyk Gateway or issue a hot reload command:

```curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

You can go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) to see where Tyk has stored your Tyk OAS API Definition.



## Tutorial 2: Create a Tyk OAS API using a file


