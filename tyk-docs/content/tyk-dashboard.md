---
date: 2017-03-23T13:16:05Z
title: Tyk Dashboard
menu:
  main:
    parent: "Tyk Stack"
identifier: dashboard-component
weight: 8 
aliases:
  - /concepts/tyk-components/dashboard/
  - /getting-started/tyk-components/dashboard/
---

The Tyk Dashboard is the GUI and analytics platform for Tyk. It provides an easy-to-use management interface for managing a Tyk installation as well as clear and granular analytics.

The Dashboard also provides the [API Developer Portal]({{< ref "/content/tyk-developer-portal.md" >}}), a customizable developer portal for your API documentation, developer auto-enrollment and usage tracking.

The Dashboard also exposes the Developer Portal as a separate component of the application. This means it can either be deployed as an internet-facing application or as a purely admin application depending on how it is being used:

{{< img src="/img/diagrams/tyk-selfmanaged-architecture-dashboard.png" alt="Tyk Dashboard diagram" >}}

## Tyk Dashboard API
The Dashboard is a large, granular REST API with a thin-client web front-end, and if being deployed as part of a Tyk install, serves as the main integration point instead of the Gateway API.

{{< img src="/img/diagrams/dashboardapi2.png" alt="API Overview" >}}

The Dashboard API is a superset of the Gateway API, providing the same functionality, with additional features (anything that can be done in the Dashboard has an API endpoint), and offers some additional advantages:
 - the Dashboard API has a granular structure, you can create separate clients easily
 - the API features read/write permissions on a per-endpoint level to have extra control over integrations
 - the API enforces a schema that can be modified and hardened depending on your usage requirements

The Dashboard exposes two APIs:
 - the Dashboard API for operational use of the Dashboard
 - the [Dashboard Admin API]({{< ref "basic-config-and-security/security/dashboard/dashboard-admin-api" >}}) for initial and administrative configuration

## Accessing the Dashboard API
The [Tyk Dashboard API]({{< ref "tyk-dashboard-api.md" >}}) is secured using an `Authorization` header that must be added to each request that is made. The **Tyk Dashboard API Access Credentials** `Authorization` key can be found within the Dashboard UI at the bottom of the **Edit User** section for a user.
