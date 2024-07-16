---
title: "Management of APIs"
date: 2024-06-25
tags: ["Tyk", "Kubernetes", "API Management", "CRD", "DevOps", "API Gateway Configuration"]
description: "This documentation provides a comprehensive guide on configuring various aspects of API descriptions and metadata using Tyk Operator. It includes detailed instructions and examples for setting API name, status, category, ID, path, ownership, and versioning within the ApiDefinition Custom Resource Definition (CRD). The guide ensures that users can manage their Tyk API Gateway configurations effectively within a Kubernetes environment."
keywords: ["Tyk Operator", "Kubernetes", "API Gateway", "API Configuration", "API Metadata", "ApiDefinition CRD", "Tyk Dashboard", "API Status", "API Category", "API ID", "API Path", "API Ownership", "API Versioning"]
---

This documentation provides a comprehensive guide on configuring various aspects of API descriptions and metadata using Tyk Operator.

## API Name

To set the name of an API in the `ApiDefinition`, use the `spec.name` string field. This name is displayed on the Tyk Dashboard and should concisely describe what the API represents.

Example:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: example-api # This is the metadata name of the Kubernetes resource
spec:
  name: Example API # This is the "API NAME" in Tyk
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://example.com
    listen_path: /example
    strip_listen_path: true
```

## API Status (inactive/active)

The status determines whether the API definition will be loaded on the Tyk Gateway. Use the `spec.active` boolean field to set the API status. An active API will be loaded to the Gateway, while an inactive API will not, resulting in a 404 response when called.

Example

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: inactive-api
spec:
  name: Inactive API
  use_keyless: true
  protocol: http
  active: false
  proxy:
    target_url: http://inactive.example.com
    listen_path: /inactive
    strip_listen_path: true
```

## API Category

For Tyk Classic API, you can specify the category name using the `spec.name` field with a `#` qualifier. This will categorize the API in the Tyk Dashboard.

Example

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: categorized-api
spec:
  name: "my-classic-api #global #staging"
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://categorized.example.com
    listen_path: /categorized
    strip_listen_path: true
```

## API ID

### Creating a new API

If you're creating a new API using Tyk Operator, you don't need to specify the ID in the manifest. The API ID will be generated in a deterministic way. You can inspect `status.api_id` field to get the generated API ID.

Example

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: order
  namespace: shop
spec:
  name: Order API
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://order.example.com
    listen_path: /order
    strip_listen_path: true
```

Run the following command to inspect generated API ID.

```bash
% kubectl get apidefinition order --namespace shop -o yaml | grep api_id -B 1
status:
  api_id: c2hvcC9vcmRlcg
```

### Updating an existing API

If you already have API configurations created in the Tyk Dashboard and want to start using Tyk Operator to manage these APIs, you can include the existing API ID in the manifest under the `spec.api_id` field. This way, when you apply the manifest, Tyk Operator will not create a new API in the Dashboard. Instead, it will update the original API with the Kubernetes spec.

Example

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: existing-api
  namespace: default
spec:
  name: Existing API
  api_id: 12345
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://existing.example.com
    listen_path: /existing
    strip_listen_path: true
```

In this example, the API with ID `12345` will be updated according to the provided spec instead of creating a new API.

## API Ownership

To configure API ownership, ensure Tyk Operator is also an owner of the API. This can be done using Operator Context. For details, refer to Tyk [Operator API Ownership]({{< ref "product-stack/tyk-operator/getting-started/tyk-operator-api-ownership">}}).

## API Versioning

To configure API versions in the `ApiDefinition` custom resource, use the `spec.version_datas` object. 

Example:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: versioned-api
spec:
  name: Versioned API
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://version-api.example.com
    listen_path: /version-api
    strip_listen_path: true
  definition:
  # Tyk should find version data in Header
    location: header
    key: x-api-version

  # Tyk should find version data in First URL Element
    #location: url

  # Tyk should find version data in URL/Form Parameter
    #location: url-param
    #key: api-version
  version_data:
    default_version: v1
    not_versioned: false
    versions:
      v1:
        name: v1
        expires: ""
        use_extended_paths: true
        extended_paths:
          ignored:
            - path: /v1/ignored/noregex
              method_actions:
                GET:
                  action: no_action
                  code: 200
                  data: ""
                  headers:
                    x-tyk-override-test: tyk-override
                    x-tyk-override-test-2: tyk-override-2
          white_list:
            - path: v1/allowed/allowlist/literal
              method_actions:
                GET:
                  action: no_action
                  code: 200
                  data: ""
                  headers:
                    x-tyk-override-test: tyk-override
                    x-tyk-override-test-2: tyk-override-2
            - path: v1/allowed/allowlist/reply/{id}
              method_actions:
                GET:
                  action: reply
                  code: 200
                  data: flump
                  headers:
                    x-tyk-override-test: tyk-override
                    x-tyk-override-test-2: tyk-override-2
            - path: v1/allowed/allowlist/{id}
              method_actions:
                GET:
                  action: no_action
                  code: 200
                  data: ""
                  headers:
                    x-tyk-override-test: tyk-override
                    x-tyk-override-test-2: tyk-override-2
          black_list:
            - path: v1/disallowed/blocklist/literal
              method_actions:
                GET:
                  action: no_action
                  code: 200
                  data: ""
                  headers:
                    x-tyk-override-test: tyk-override
                    x-tyk-override-test-2: tyk-override-2
```