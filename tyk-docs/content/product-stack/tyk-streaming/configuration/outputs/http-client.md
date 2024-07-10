---
title: Http Client
description: Explains an overview of configuring Http client output
tags: [ "Tyk Streams", "Stream Outputs", "Outputs", "Http Client", "http_client" ]
---

Sends messages to an HTTP server.


## Common

```yml
# Common config fields, showing default values
output:
  label: ""
  http_client:
    url: "" # No default (required)
    verb: POST
    headers: {}
    rate_limit: "" # No default (optional)
    timeout: 5s
    max_in_flight: 64
    batching:
      count: 0
      byte_size: 0
      period: ""
      check: ""
```

## Advanced

```yml
# All config fields, showing default values
output:
  label: ""
  http_client:
    url: "" # No default (required)
    verb: POST
    headers: {}
    metadata:
      include_prefixes: []
      include_patterns: []
    dump_request_log_level: ""
    # oauth:
    #   enabled: false
    #   consumer_key: ""
    #   consumer_secret: ""
    #   access_token: ""
    #   access_token_secret: ""
    # oauth2:
    #   enabled: false
    #   client_key: ""
    #   client_secret: ""
    #   token_url: ""
    #   scopes: []
    #   endpoint_params: {}
    # basic_auth:
    #   enabled: false
    #   username: ""
    #   password: ""
    # jwt:
    #   enabled: false
    #   private_key_file: ""
    #   signing_method: ""
    #   claims: {}
    #   headers: {}
    # tls:
    #   enabled: false
    #   skip_cert_verify: false
    #   enable_renegotiation: false
    #   root_cas: ""
    #   root_cas_file: ""
    #   client_certs: []
    extract_headers:
      include_prefixes: []
      include_patterns: []
    rate_limit: "" # No default (optional)
    timeout: 5s
    retry_period: 1s
    max_retry_backoff: 300s
    retries: 3
    backoff_on:
      - 429
    drop_on: []
    successful_on: []
    proxy_url: "" # No default (optional)
    batch_as_multipart: false
    propagate_response: false
    max_in_flight: 64
    batching:
      count: 0
      byte_size: 0
      period: ""
      check: ""
      processors: [] # No default (optional)
    multipart: []
```

When the number of retries expires the output will reject the message, the behaviour after this will depend on the pipeline but usually this simply means the send is attempted again until successful whilst applying back pressure.

The URL and header values of this type can be dynamically set using [function interpolations]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}}).

The body of the HTTP request is the raw contents of the message payload. If the message has multiple parts (is a batch) the request will be sent according to [RFC1341](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html). This behaviour can be disabled by setting the field [batch_as_multipart](#batch_as_multipart) to `false`.

### Propagating Responses

It's possible to propagate the response from each HTTP request back to the input source by setting `propagate_response` to `true`. Only inputs that support [synchronous responses]({{< ref "/product-stack/tyk-streaming/guides/sync-responses" >}}) are able to make use of these propagated responses.

## Performance

This output benefits from sending multiple messages in flight in parallel for improved performance. You can tune the max number of in flight messages (or message batches) with the field `max_in_flight`.

This output benefits from sending messages as a [batch](TODO) for improved performance. Batches can be formed at both the input and output level.

## Fields

### url

The URL to connect to.
This field supports [interpolation functions]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}}).

Type: `string`  

### verb

A verb to connect with


Type: `string`  
Default: `"POST"`  

```yml
# Examples

verb: POST

verb: GET

verb: DELETE
```

### headers

A map of headers to add to the request.
This field supports [interpolation functions]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}}).


Type: `object`  
Default: `{}`  

```yml
# Examples

headers:
  Content-Type: application/octet-stream
  traceparent: ${! tracing_span().traceparent }
```

### metadata

Specify optional matching rules to determine which metadata keys should be added to the HTTP request as headers.


Type: `object`  

### metadata.include_prefixes

Provide a list of explicit metadata key prefixes to match against.


Type: `array`  
Default: `[]`  

```yml
# Examples

include_prefixes:
  - foo_
  - bar_

include_prefixes:
  - kafka_

include_prefixes:
  - content-
```

### metadata.include_patterns

Provide a list of explicit metadata key regular expression (re2) patterns to match against.


Type: `array`  
Default: `[]`  

```yml
# Examples

include_patterns:
  - .*

include_patterns:
  - _timestamp_unix$
```

### dump_request_log_level

Optionally set a level at which the request and response payload of each request made will be logged.


Type: `string`  
Default: `""`  
Requires version 4.12.0 or newer  
Options: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`, ``.

<!-- ### oauth

Allows you to specify open authentication via OAuth version 1.


Type: `object`  

### oauth.enabled

Whether to use OAuth version 1 in requests.


Type: `bool`  
Default: `false`  

### oauth.consumer_key

A value used to identify the client to the service provider.


Type: `string`  
Default: `""`  

### oauth.consumer_secret

A secret used to establish ownership of the consumer key.
:::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
:::


Type: `string`  
Default: `""`  

### oauth.access_token

A value used to gain access to the protected resources on behalf of the user.


Type: `string`  
Default: `""`  

### oauth.access_token_secret

A secret provided in order to establish ownership of a given access token.
:::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
:::


Type: `string`  
Default: `""`  

### oauth2

Allows you to specify open authentication via OAuth version 2 using the client credentials token flow.


Type: `object`  

### oauth2.enabled

Whether to use OAuth version 2 in requests.


Type: `bool`  
Default: `false`  

### oauth2.client_key

A value used to identify the client to the token provider.


Type: `string`  
Default: `""`  

### oauth2.client_secret

A secret used to establish ownership of the client key.
:::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
:::


Type: `string`  
Default: `""`  

### oauth2.token_url

The URL of the token provider.


Type: `string`  
Default: `""`  

### oauth2.scopes

A list of optional requested permissions.


Type: `array`  
Default: `[]`  
Requires version 3.45.0 or newer  

### oauth2.endpoint_params

A list of optional endpoint parameters, values should be arrays of strings.


Type: `object`  
Default: `{}`  
Requires version 4.21.0 or newer  

```yml
# Examples

endpoint_params:
  bar:
    - woof
  foo:
    - meow
    - quack
```

### basic_auth

Allows you to specify basic authentication.


Type: `object`  

### basic_auth.enabled

Whether to use basic authentication in requests.


Type: `bool`  
Default: `false`  

### basic_auth.username

A username to authenticate as.


Type: `string`  
Default: `""`  

### basic_auth.password

A password to authenticate with.
:::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
:::


Type: `string`  
Default: `""`  

### jwt

Allows you to specify JWT authentication.


Type: `object`  

### jwt.enabled

Whether to use JWT authentication in requests.


Type: `bool`  
Default: `false`  

### jwt.private_key_file

A file with the PEM encoded via PKCS1 or PKCS8 as private key.


Type: `string`  
Default: `""`  

### jwt.signing_method

A method used to sign the token such as RS256, RS384, RS512 or EdDSA.


Type: `string`  
Default: `""`  

### jwt.claims

A value used to identify the claims that issued the JWT.


Type: `object`  
Default: `{}`  

### jwt.headers

Add optional key/value headers to the JWT.


Type: `object`  
Default: `{}`  

### tls

Custom TLS settings can be used to override system defaults.


Type: `object`  

### tls.enabled

Whether custom TLS settings are enabled.


Type: `bool`  
Default: `false`  

### tls.skip_cert_verify

Whether to skip server side certificate verification.


Type: `bool`  
Default: `false`  

### tls.enable_renegotiation

Whether to allow the remote server to repeatedly request renegotiation. Enable this option if you're seeing the error message `local error: tls: no renegotiation`.


Type: `bool`  
Default: `false`  
Requires version 3.45.0 or newer  

### tls.root_cas

An optional root certificate authority to use. This is a string, representing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.
:::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
:::


Type: `string`  
Default: `""`  

```yml
# Examples

root_cas: |-
  -----BEGIN CERTIFICATE-----
  ...
  -----END CERTIFICATE-----
```

### tls.root_cas_file

An optional path of a root certificate authority file to use. This is a file, often with a .pem extension, containing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`  
Default: `""`  

```yml
# Examples

root_cas_file: ./root_cas.pem
```

### tls.client_certs

A list of client certificates to use. For each certificate either the fields `cert` and `key`, or `cert_file` and `key_file` should be specified, but not both.


Type: `array`  
Default: `[]`  

```yml
# Examples

client_certs:
  - cert: foo
    key: bar

client_certs:
  - cert_file: ./example.pem
    key_file: ./example.key
```

### tls.client_certs[].cert

A plain text certificate to use.


Type: `string`  
Default: `""`  

### tls.client_certs[].key

A plain text certificate key to use.
:::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
:::


Type: `string`  
Default: `""`  

### tls.client_certs[].cert_file

The path of a certificate to use.


Type: `string`  
Default: `""`  

### tls.client_certs[].key_file

The path of a certificate key to use.


Type: `string`  
Default: `""`  

### tls.client_certs[].password

A plain text password for when the private key is password encrypted in PKCS#1 or PKCS#8 format. The obsolete `pbeWithMD5AndDES-CBC` algorithm is not supported for the PKCS#8 format. Warning: Since it does not authenticate the ciphertext, it is vulnerable to padding oracle attacks that can let an attacker recover the plaintext.
:::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
:::


Type: `string`  
Default: `""`  

```yml
# Examples

password: foo

password: ${KEY_PASSWORD}
```
-->
### extract_headers

Specify which response headers should be added to resulting synchronous response messages as metadata. Header keys are lowercased before matching, so ensure that your patterns target lowercased versions of the header keys that you expect. This field is not applicable unless `propagate_response` is set to `true`.


Type: `object`  

### extract_headers.include_prefixes

Provide a list of explicit metadata key prefixes to match against.


Type: `array`  
Default: `[]`  

```yml
# Examples

include_prefixes:
  - foo_
  - bar_

include_prefixes:
  - kafka_

include_prefixes:
  - content-
```

### extract_headers.include_patterns

Provide a list of explicit metadata key regular expression (re2) patterns to match against.


Type: `array`  
Default: `[]`  

```yml
# Examples

include_patterns:
  - .*

include_patterns:
  - _timestamp_unix$
```

### rate_limit

An optional [rate limit](/docs/components/rate_limits/about) to throttle requests by.


Type: `string`  

### timeout

A static timeout to apply to requests.


Type: `string`  
Default: `"5s"`  

### retry_period

The base period to wait between failed requests.


Type: `string`  
Default: `"1s"`  

### max_retry_backoff

The maximum period to wait between failed requests.


Type: `string`  
Default: `"300s"`  

### retries

The maximum number of retry attempts to make.


Type: `int`  
Default: `3`  

### backoff_on

A list of status codes whereby the request should be considered to have failed and retries should be attempted, but the period between them should be increased gradually.


Type: `array`  
Default: `[429]`  

### drop_on

A list of status codes whereby the request should be considered to have failed but retries should not be attempted. This is useful for preventing wasted retries for requests that will never succeed. Note that with these status codes the _request_ is dropped, but _message_ that caused the request will not be dropped.


Type: `array`  
Default: `[]`  

### successful_on

A list of status codes whereby the attempt should be considered successful, this is useful for dropping requests that return non-2XX codes indicating that the message has been dealt with, such as a 303 See Other or a 409 Conflict. All 2XX codes are considered successful unless they are present within `backoff_on` or `drop_on`, regardless of this field.


Type: `array`  
Default: `[]`  

### proxy_url

An optional HTTP proxy URL.


Type: `string`  

### batch_as_multipart

Send message batches as a single request using [RFC1341](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html). If disabled messages in batches will be sent as individual requests.


Type: `bool`  
Default: `false`  

### propagate_response

Whether responses from the server should be [propagated back](/docs/guides/sync_responses) to the input.


Type: `bool`  
Default: `false`  

### max_in_flight

The maximum number of parallel message batches to have in flight at any given time.


Type: `int`  
Default: `64`  

### batching

Allows you to configure a [batching policy](/docs/configuration/batching).


Type: `object`  

```yml
# Examples

batching:
  byte_size: 5000
  count: 0
  period: 1s

batching:
  count: 10
  period: 1s

batching:
  check: this.contains("END BATCH")
  count: 0
  period: 1m
```

### batching.count

A number of messages at which the batch should be flushed. If `0` disables count based batching.


Type: `int`  
Default: `0`  

### batching.byte_size

An amount of bytes at which the batch should be flushed. If `0` disables size based batching.


Type: `int`  
Default: `0`  

### batching.period

A period in which an incomplete batch should be flushed regardless of its size.


Type: `string`  
Default: `""`  

```yml
# Examples

period: 1s

period: 1m

period: 500ms
```

### batching.check

A [Bloblang query]({{< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}}) that should return a boolean value indicating whether a message should end a batch.


Type: `string`  
Default: `""`  

```yml
# Examples

check: this.type == "end_of_transaction"
```

### batching.processors

A list of processorsto apply to a batch as it is flushed. This allows you to aggregate and archive the batch however you see fit. Please note that all resulting messages are flushed as a single batch, therefore splitting the batch into smaller batches using these processors is a no-op.


Type: `array`  

```yml
# Examples

processors:
  - archive:
      format: concatenate

processors:
  - archive:
      format: lines

processors:
  - archive:
      format: json_array
```

### multipart

Create explicit multipart HTTP requests by specifying an array of parts to add to the request, each part specified consists of content headers and a data field that can be populated dynamically. If this field is populated it will override the default request creation behaviour.


Type: `array`  
Default: `[]`  
Requires version 3.63.0 or newer  

### multipart[].content_type

The content type of the individual message part.
This field supports [interpolation functions]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}})


Type: `string`  
Default: `""`  

```yml
# Examples

content_type: application/bin
```

### multipart[].content_disposition

The content disposition of the individual message part.
This field supports [interpolation functions]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}})


Type: `string`  
Default: `""`  

```yml
# Examples

content_disposition: form-data; name="bin"; filename='${! @AttachmentName }
```

### multipart[].body

The body of the individual message part.
This field supports [interpolation functions]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}}).


Type: `string`  
Default: `""`  

```yml
# Examples

body: ${! this.data.part1 }
```