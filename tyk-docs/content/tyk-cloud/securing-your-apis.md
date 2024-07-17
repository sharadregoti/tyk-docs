---
title: "Securing Your APIs"
date: 2021-07-21
tags: ["Tyk Cloud", "Configuration", "Securing APIs"]
description: "How to secure your APIs with Tyk Cloud"
weight: 5
menu:
  main:
    parent: "Configuration Options"
---

## Introduction

If you decide to use Tyk Cloud to protect your APIs, you need to make APIs accessible to your Tyk Cloud Data Planes so that Tyk can connect your clients to them. A common question that arises is, “how do I secure my APIs (backend services)?”.

Here are the most popular ways to secure your APIs.

## 1. Mutual TLS or Client authorization

1. This is the most secure method to protect your APIs. With Client  authorization, you need to add your Tyk Gateway certificates to an allow-list in all your backends and they will then accept access requests only from clients that present these pre authorized certificates. There are a few limitations with this approach:
  
    a. Depending on your setup, you might need to add it to every backend service. If you have a Load Balancer (LB), then it can be set at the LB level.
    
    b. Sometimes the LBs (like Application Load Balancers) do not support mTLS and then you need to find other solutions, like [Request Signing](#2-request-signing).  Another option that might be possible, is to front your services or your LB with an L7 API Gateway (Like Tyk!) to do mTLS with the Tyk Cloud Data Planes on Tyk Cloud.

2. You need to be able to update the list in case certificates expire or get revoked.

## 2. Request Signing

Tyk can [sign the request with HMAC or RSA]({{< ref "product-stack/tyk-gateway/release-notes/archived-releases/version-2.9.md#hmac-request-signing" >}}), before sending it to the API target. This is an implementation of an [RFC Signing HTTP Messages(draft 10)](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures-10). This RFC was designed to provide authenticity of the digital signature of the client. In our flow, the Tyk Cloud Data Planes, as the client, using a certificate private key, will add a header signature to the request. The API, using a pre-agreed public key (based on a meaningful keyId identifier) will verify the authenticity of the request coming from your Tyk Cloud Data Plane.
 A limitation is that the APIs or LB need to implement this signature verification and be able to update the certificates as mentioned in [Mutual TLS or Client authorization](#1-mutual-tls-or-client-authorization).

 ## 3. IP Whitelisting

 Each Tyk Cloud organization is dedicated to an IP range which is unique to them. This allows you to restrict access to your APIs to only API requests coming from your Tyk Cloud organization.  

IP Whitelisting is susceptible to IP Spoofing, and it is recommended to be combined with an API Key in secure environments.

In order to find your organization’s IP range, please open a support ticket with our support team, which is available to all paying customers.

## 4. Post plugin with OAuth flow

The custom plugin approach is mentioned last because it involves writing a bit of code. However, if your appetite allows for it, custom plugins offer the most flexibility of all these solutions.  You can use Tyk’s custom plugins to execute an OAuth flow, for example, between Tyk (as the client) and your authorization server, and inject a Bearer token into the request. The backend service will need to validate the bearer as usual. You can write [custom plugins]({{< ref "tyk-cloud/using-plugins.md" >}}) in a variety of languages.

## Where to Authenticate?

No matter which option or combination of options you choose, it is best to keep this authentication layer outside your application logic. This glue code should be placed in your ingress, whatever that might be. By keeping this logic outside your application, you keep a separation between the business logic and the boilerplate code.  You can even use the Tyk Open Source API Gateway as an ingress to protect your APIs, and it is compatible with all the methods mentioned above.

   
