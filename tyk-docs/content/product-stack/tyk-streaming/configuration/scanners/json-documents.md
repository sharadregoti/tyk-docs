---
title: JSON documents
description: Explains an overview of json_documents scanner in Tyk Streams
tags: [ "Tyk Streams", "Scanners", "JSON documents", "json_documents" ]
---

Consumes a stream of one or more JSON documents.

<!-- TODO Improve this example maybe using HTTP CLient 

input:
  http_client:
    rate_limit: example_rate_limit
    stream:
      scanner: json_documents
    url: https://jsonplaceholder.typicode.com/todos
    verb: GET
output:
  http_server:
    ws_path: /subscribe
rate_limit_resources:
  - label: example_rate_limit
    local:
      count: 10
      interval: 1s
-->

```yml
# Config fields, showing default values
json_documents: {}
```
