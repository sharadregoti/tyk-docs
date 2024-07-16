---
title: Using the Mock Response middleware with Tyk Classic APIs
date: 2024-01-31
description: "Using the Mock Response middleware with Tyk Classic APIs"
tags: ["mock response", "middleware", "per-endpoint", "Tyk Classic", "Tyk Classic API"]
---

The [Mock Response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}) middleware allows you to configure Tyk to return a response for an API endpoint without requiring an upstream service. This can be useful when creating a new API or making a development API available to an external team.

When working with Tyk Classic APIs, this middleware is executed at the start of the request processing chain. Thus an endpoint with the mock response middleware will not be authenticated, will not process other middleware configured for the API (neither API nor endpoint level) and will have no analytics created.  It will simply return the configured response for any request made to that endpoint.

The middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas" >}}) page.

### Endpoint parsing

When you define an endpoint in your API Definition (for example `GET /anything`), Tyk will also match for `GET /anything/somepath` and any other sub-path based on the `GET /anything` route.

You will typically configure the _mock response_ middleware to give the mocked response for only specific paths, for example you may not want Tyk to provide the mock response for `GET /anything/somepath`.

If you add a `$` at the end of the `listen_path` (in our example `GET /anything$`) then Tyk's regular expression matching will be exact, and will not match endpoints with characters following the specified endpoint.

Thus, if you enable the middleware for `GET /anything$` then `GET /anything/somepath` will be proxied to the upstream and will not trigger the mock response.

## Configuring the middleware in the Tyk Classic API Definition

To enable mock response, you must first add the endpoint to a list - one of [allow list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}), [block list]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware" >}}) or [ignore authentication]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}). This will add a new object to the `extended_paths` section of your API definition - `white_list`, `black_list` or `ignored`. The mock response can then be configured within the `method_actions` element within the new object.

The `white_list`, `black_list` and `ignored` objects all have the same structure and configuration as follows:
- `path`: the endpoint path
- `method`: this should be blank
- `ignore_case`: if set to `true` then the path matching will be case insensitive
- `method_actions`: the configuration of the mock response

The `method_actions` object should be configured as follows, with an entry created for each method on the path for which you wish to configure the mock response:
- `action`: this should be set to `reply`
- `code`: the HTTP status code to be provided with the response
- `headers`: the headers to inject with the response
- `data`: the payload to be returned as the body of the response

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "white_list": [
            {
                "disabled": false,
                "path": "/anything",
                "method": "",
                "ignore_case": false,
                "method_actions": {
                    "GET": {
                        "action": "reply",
                        "code": 200,
                        "data": "This is the mock response body",
                        "headers": {
                            "X-Example-Header": "foobar"
                        }
                    }          
                }
            }
        ]
    }
}
```

In this example the mock response middleware has been configured for requests to the `GET /anything` endpoint. The [allow list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}) middleware has been enabled for this endpoint and is case sensitive, so calls to `GET /Anything` will not return the mock response.

A call to `GET /anything` would return:

```
HTTP/1.1 200 OK
X-Example-Header: foobar
Date: Wed, 31 Jan 2024 16:21:05 GMT
Content-Length: 30
Content-Type: text/plain; charset=utf-8

This is the mock response body
```

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the Mock Response middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and configure a list plugin

For the mock response to be enabled, the endpoint must also be in a list. We recommend adding the path to an allow list by [selecting]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic#configuring-the-allow-list-in-the-api-designer" >}}) the **Whitelist** plugin.

#### Step 2: Add the mock response plugin

Now select the **Mock response** plugin.

{{< img src="/img/dashboard/endpoint-designer/mock-response.png" alt="Selecting the mock response middleware for a Tyk Classic API" >}}

#### Step 3: Configure the middleware

Once you have selected the Mock response middleware for the endpoint, you can configure the HTTP status code, headers and body to be included in the response. Remember to click **ADD**, to add each header to the response.

{{< img src="/img/dashboard/endpoint-designer/mock-response-config.png" alt="Configuring the mock response middleware for a Tyk Classic API" >}}

#### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.
 
{{< note success >}}
**Note**  

For the mock response to be enabled, the endpoint must also be in a list. We recommend adding the path to an [allow list]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#allowlist" >}}). If this isn't done, then the mock will not be saved when you save your API in the designer.
{{< /note >}}
