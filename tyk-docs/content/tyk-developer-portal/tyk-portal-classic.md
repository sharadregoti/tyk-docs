---
title: "Tyk Classic Developer Portal"
date: 2022-02-07
tags: [""]
description: ""
menu:
  main:
    parent: "Tyk Developer Portal"
weight: 1
---

The Tyk Classic Developer Portal is a small CMS-like system that enables you to expose a facade of your APIs and then allow third-party developers to register and use your APIs.

The Tyk Classic Developer Portal enables you to:

*   Host pages written in Markdown to describe your API and product.
*   Use Bootstrap based templates to completely customize the look and feel.
*   Host your API documentation in Swagger/OpenAPI or API Blueprint for developers to use. In the case of Swagger/OpenAPI, you can either paste your Swagger content (JSON or YAML) into the code editor, or via a link to a public Swagger hosted URL, which can then be rendered by using [Swagger UI](https://swagger.io/tools/swagger-ui/).
*   Unlike other platforms, Tyk will not auto-publish your APIs to the Portal, instead they are presented as a facade, you choose what APIs and what Policies to expose to the Portal.
*   Fully control the flow of the developer sign-up and enrollment.

The Tyk Classic Developer Portal is suitable for primary use cases, however if you want a more feature-rich experience then you should consider the [Tyk Enterprise Developer Portal]({{< ref "tyk-developer-portal/tyk-enterprise-developer-portal" >}}). This provides audience management, full UI customization including custom JS insertion and custom page templates, forums and blog features, grouping APIs into API Products, and other enterprise-grade features.

{{< note success >}}
**Note**  

Support for API Blueprint is being deprecated. See [Importing APIs]({{< ref "getting-started/import-apis#api-blueprint-is-being-deprecated" >}}) for more details.
{{< /note >}}

The Tyk Classic Developer Portal is available to Tyk Self-Managed and Tyk Cloud users.

For examples of how clients have used our portal, visit:

- [https://developer.hotelbeds.com/](https://developer.hotelbeds.com/)
- [https://developer.ft.com/portal](https://developer.ft.com/portal)
- [https://developer.geops.io/](https://developer.geops.io/)
- [https://opentransportdata.swiss/en/](https://opentransportdata.swiss/en/)
