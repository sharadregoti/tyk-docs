---
title: "API Definition"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "API Definition"]
description: "Support features of APIDefinition CRD"
---

The ApiDefinition custom resource defines configuration of [Tyk Classic API Definition object]({{<ref "tyk-gateway-api/api-definition-objects">}}).

Here are the supported features:

## API Types

| Type                           | Support | Supported From | Comments                     | Sample                                                                                     |
|--------------------------------|---------|----------------|------------------------------|--------------------------------------------------------------------------------------------|
| HTTP                           | ✅      | v0.1           | -                            | [HTTP Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#http-proxy">}}) |
| HTTPS                          | ✅      | v0.4           | -                            | [HTTPS Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#https-proxy">}}) |
| TCP                            | ✅      | v0.1           | -                            | [TCP Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-tcp">}}) |
| TLS                            | ✅      | v0.1           | -                            |                                                                                            |
| GraphQL - Proxy                | ✅      | v0.1           | -                            | [GraphQL Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-graphql">}}) |
| Universal Data Graph v1        | ✅      | v0.1           | -                            | [UDG v1 Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-udg#udg-v1-tyk-31-or-before">}}) |
| Universal Data Graph v2        | ✅      | v0.12          | -                            | [UDG v2 Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-udg#udg-v2-tyk-32-and-above">}}) |
| GraphQL - Federation           | ✅      | v0.12          | -                            | [GraphQL Federation]({{<ref "product-stack/tyk-operator/advanced-configurations/graphql-federation">}}) |

## Management of APIs

| Type                           | Support | Supported From | Comments                     | Sample |
|--------------------------------|---------|----------------|------------------------------|--------|
| API Name                       | ✅      | v0.1           | - | [API Name]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-name">}}) |
| API Status (inactive/active)   | ✅      | v0.2           | - | [API Status]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-status-inactiveactive">}}) |
| API Categories                 | ✅      | v0.1           | - | [API Categories]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-category">}}) |
| API ID                         | ✅      | v0.1           | - | [API ID]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-id">}}) |-                            |                                                                                            |
| API Ownership                  | ✅      | v0.12          | - | [API Ownership]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-ownership">}}) |
| API Versioning                 | ✅      | v0.1           | - | [API Versioning]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-versioning">}}) |

## Traffic Routing
<!--| API Listen Path                | ✅      | v0.1           | - | [API Listen Path]() |-->

| Type                        | Supported | Supported From | Comments | Sample        |
| --------------------------- | --------- | -------------- | -------- | ------------- |
| API Listen Path             | ✅        | v0.1           | - | - |
| Path-Based                  | ✅        | v0.1           | -        | [Sample](./../config/samples/httpbin.yaml) |
| Host-Based                  | ✅        | v0.1           | -        | [Sample](./../config/samples/httpbin_routing_by_hostname.yaml) |
| Version-Based (Header)      | ⚠️         | v0.1           | Untested |        |
| Version-Based (QueryString) | ⚠️         | v0.1           | Untested |        |
| Version-Based (Subdomain)   | ⚠️         | v0.1           | Untested |        |

## Client to Gateway Authentication and Authorization

| Type                          | Supported | Supported From | Comments | Sample        |
| ----------------------------- | --------- | -------------- | -------- | ------------- |
| Keyless                       | ✅        | v0.1           | -        | [Sample](./../config/samples/httpbin.yaml) |
| Auth Token                    | ✅        | v0.1           | -        | [Sample](./../config/samples/httpbin_protected.yaml) |
| JWT                           | ✅️        | v0.5           | -        | [Sample](./../config/samples/jwt-auth) |
| OpenID Connect                | ❌        | -              | JWT is the recommended way configuring OIDC. Please see [OpenID Connect]({{<ref "basic-config-and-security/security/authentication-authorization/openid-connect">}}) documentation for details. | |
| OAuth2                        | ❌        | -              | JWT is the recommended way to configure OAuth2. Please see [OpenID Connect]({{<ref "basic-config-and-security/security/authentication-authorization/openid-connect">}}) documentation for details. | |
| mTLS                          | ✅        | v0.11              | Only static client mTLS is supported | [Sample](./../config/samples/mtls/client/) |
| HMAC                          | ❌        | -              | Not implemented | |
| Basic Authentication          | ✅        | v0.12          | Only enabling with default metadata values is supported  | [Sample](./../config/samples/basic-auth/httpbin_basic_authentication.yaml) |
| Custom Authentication Plugin (Go)   | ✅        | v0.11          | - | [Sample](./api_definitions/custom_plugin_goauth.yaml) |
| Custom Authentication Plugin (gRPC) | ✅        | v0.1           | - | [Sample](./../bdd/features/api_http_grpc_plugin.feature) |
| Multiple Authentication       | ✅        | v0.14          | - | [Sample](./../config/samples/multiple-auth/httpbin_basic_authentication_and_mTLS.yaml) |
| IP Allowlist                  | ✅        | v0.5           | - | [Sample](./api_definitions/ip.md#whitelisting) |
| IP Blocklist                  | ✅        | v0.5           | - | [Sample](./api_definitions/ip.md#blacklisting) |
| GW Request Signing            | ❌        | -              | Not implemented | |
| Token expiration (session_lifetime) | ✅  | v0.5           | - | |

## Gateway to Upstream Authentication

| Type                                            | Supported | Supported From | Comments        | Sample        |
|-------------------------------------------------|-----------|----------------|-----------------| ------------- |
| Upstream Certificates mTLS                      | ✅        | v0.9           |                 | [From Secret](../config/samples/httpbin_upstream_cert.yaml) or [Manual Upload](../config/samples/httpbin_upstream_cert_manual.yaml) |
| Public Key Certificate Pinning                  | ✅        | v0.9           |                 | [Sample](../config/samples/httpbin_certificate_pinning.yaml) |
| Upstream Request Signing                        | ❌        | -              | Not implemented | |

## API-level (Global) Features

| Feature                              | Supported | Supported From | Comments                                                               | Sample                                                          |
|--------------------------------------|-----------|----------------|------------------------------------------------------------------------|-----------------------------------------------------------------|
| Detailed recording (in Log Browser)  | ✅        | v0.4.0         | -                                                                      |                                                                 |
| Config Data                          | ✅        | v0.8.2         | -                                                                      | [Sample](./../config/samples/config_data_virtual_endpoint.yaml) |
| Context Variables                    | ✅        | v0.1           | -                                                                      |
| Cross Origin Resource Sharing (CORS) | ✅        | v0.2           | - | [Sample](./../config/samples/httpbin_cors.yaml)                 |
| Service Discovery                    | ⚠️         | -              | Untested                                                                |                                                                 |
| Segment Tags                         | ✅        | v0.1           | -                                                                      | [Sample](./../config/samples/httpbin_tagged.yaml)               |
| Internal API (not exposed by Gateway)| ✅        | v0.6.0         | -                                                                      |                                                                 |
| Global (API-level) Header Transform  | ✅        | v0.1.0         | -                                                                      | [Sample](../config/samples/httpbin_global-headers.yaml)         |
| Global (API-level) Rate Limit        | ✅        | v0.10          | -                                                                      | [Sample](./../config/samples/httpbin_global_rate_limit.yaml)    |
| Plugin Bundles                       | ❌        | -              | -                                                                      |                                                                 |
| Custom Plugins - Go                  | ⚠️         | v0.1           | Untested                                                               |
| Custom Plugins - gRPC                | ✅        | v0.1           | -                                                                      | [Sample](./../bdd/features/api_http_grpc_plugin.feature)        |
| Custom Plugins - Javascript          | ✅        | v0.1           | -                                                                      | [Sample](./api_definitions/custom_plugin.md)                    |
| Custom Plugins - Lua                 | ⚠️         | v0.1           | Untested                                                               |
| Custom Plugins - Python              | ⚠️         | v0.1           | Untested                                                               |
| Custom Plugins - Analytics Plugin    | ✅        | v0.16.0        | - | [Sample](./../config/samples/analytics_plugin.yaml)|
| Batch Requests                       | ❌        | -              | -                                                                      |                                                                 |
| Analytics API Tagging (Tag Headers)  | ✅        | v0.10.0        | Untested                                                               |
| Expire Analytics After               | ❌        | -              | -                                                                      |                                                                 |
| Do not track Analytics (per API)     | ✅        | v0.1.0         | -                                                                      |                                                                 |
| Webhooks                             | ❌        | -              | -   | |
| Looping                              | ⚠️         | v0.6           | Untested                                                               | [Sample](./api_definitions/looping.md)                          |
| Round Robin Load Balancing           | ✅        | -              | -                                                                    | [Sample](./../config/samples/enable_round_robin_load_balancing.yaml)                    |

## Endpoint-level Features

| Endpoint Middleware               | Supported | Supported From | Comments                                       | Sample        | Path |
|-----------------------------------|-----------|----------------|------------------------------------------------|---------------|--------------------------------------------|
| Allow list                        | ✅️        | v0.8.2         | -                                              | [Sample](./../config/samples/httpbin_whitelist.yaml) | "white_list" |
| Block list                        | ✅️        | v0.8.2         | -                                              | [Sample](./../config/samples/httpbin_blacklist.yaml) | "black_list" |
| Cache                             | ✅        | v0.1           | -                                              | [Sample](./../config/samples/httpbin_cache.yaml) | "cache" |
| Advance Cache                     | ✅        | v0.1           | -                                              | [Sample](./../config/samples/httpbin_advance_cache.yaml) | "advance_cache_config" |
| Circuit Breaker                   | ✅        | v0.5           | -                                              | [Sample](./../config/samples/httpbin_timeout.yaml)  | "circuit_breakers" |
| Track Endpoint                    | ✅        | v0.1           |                                                | [Sample](../config/samples/httpbin_endpoint_tracking.yaml) | "track_endpoints" |
| Do Not Track Endpoint             | ✅        | v0.1           |                                                | [Sample](../config/samples/httpbin_endpoint_tracking.yaml) | "do_not_track_endpoints" |
| Enforced Timeouts                 | ✅        | v0.1           | -                                              | [Sample](./../config/samples/httpbin_timeout.yaml) | "hard_timeouts" |
| Ignore Authentication             | ✅        | v0.8.2         | -                                              | [Sample](./../config/samples/httpbin_ignored.yaml) | "ignore" |
| Internal Endpoint                 | ✅        | v0.1           | -                                              | [Sample](./../config/samples/httpbin_endpoint_internal.yaml) | "internal" |
| URL Rewrite Basic                 | ✅️        | v0.1           | -                                              | [Sample](../config/samples/url_rewrite_basic.yaml) | "url_rewrites" |
| URL Rewrite (Advanced Trigger)    | ❌        | -              | -                                              | | "url_rewrites" |
| Validate Request                  | ✅        | v0.8.2         | -                                              | [Sample](../config/samples/httpbin_json_schema_validation.yaml) | "validate_json" |
| Request Size Limit                | ✅️        | v0.1           | -                                              | [Sample](../config/samples/request_size.yaml) | "size_limits" |
| Request Method Transform          | ✅        | v0.5           | -                                              | [Sample](../bdd/custom_resources/transform/method.yaml) | "method_transforms" |
| Request Header Transform          | ✅        | v0.1           | -                                              | - | "transform_headers" |
| Request Body Transform            | ✅        | v0.1           | -                                              | [Sample](../config/samples/httpbin_transform.yaml) | "transform" |
| Request Body JQ Transform         | ⚠️         | v0.1           | Untested - Requires [JQ on Gateway Docker Image]({{<ref "advanced-configuration/transform-traffic/jq-transformations">}}) | | "transform_jq" |
| Response Header Transform         | ✅        | v0.1           | -                                              | - | "transform_response_headers" |
| Response Body Transform           | ✅        | v0.1           | -                                              | [Sample](../config/samples/httpbin_transform.yaml) | "transform_response" |
| Response Body JQ Transform        | ⚠️         | v0.1           | Untested - Requires [JQ on Gateway Docker Image]({{<ref "advanced-configuration/transform-traffic/jq-transformations">}}) | | "transform_jq_response" |
| Mock Response                     | ✅        | v0.1           | -                                             | [Sample](../config/samples/httpbin_mock.yaml)|
| Virtual Endpoint                  | ✅        | v0.1           | -                                              | [Sample](./../config/samples/config_data_virtual_endpoint.yaml) | "virtual" |
| Go Plugin                         | ❌        | -              | -                                              |  | "go_plugin" |
| Persist Graphql                   | ❌        | -              | -                                              |  | "persist_graphql" |
