---
title: Tyk Enterprise Developer Portal v1.4.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.4.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.4.0"]
menu:
main:
parent: "Release Notes"
weight: 4
---

**Licensed Protected Product**

##### Release Date 2 June 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on a 1.3.0 or an older version we advise you to upgrade ASAP directly to this release.

## Release Highlights
#### SQL support for the portal’s assets
Until recently, SQL storage was not supported for the portal’s assets: OAS files, themes, images, etc. Therefore, customers had to use at least two types of storage:
- SQL for the portal’s metadata (users, products, access requests, etc).
- Filesystem or S3 for assets (pictures, themes, etc).

This is especially inconvenient in Kubernetes environment when customers had to use persistent volumes.
With this new feature, customers can simply use the same SQL database (MySQL, MariaDB and PostgreSQL) for both assets and metadata. To use the `db` [storage type]({{< ref "/content/product-stack/tyk-enterprise-developer-portal/deploy/configuration.md#portal_storage" >}}) just set the `PORTAL_STORAGE=db` for environment variables or `"Storage": "db"` in a config file and you are good to go!

#### Response status code added to API analytics filters
API Consumers now can filter API analytics by response status codes. This allows them to analyze traffic and error rate for specific response code for their API Products.
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.4.0-response-code-filters.png" width="500px" alt="API Analytics UI - Response code filters">}}

#### Displaying Basic Auth APIs
We introduced display-only support for basic APIs. That means API Providers can publish documentation for the basic auth APIs. However, developers cannot use the portal to get access to the basic auth APIs.

## Download
- [docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.4.0/images/sha256-11af93300ae91962e9af84ecec0e78b6cf5972521f0655273b48a7e551df3c84?context=explore)

## Changelog
#### Added
- Added SQL support for the portal's assets to simplify the storage configuration. Now our customers can store all data in one database.
- Added response status code filters in the API analytics for developers to enhance self-service capabilities for developers.
- Added displaying Basic Auth APIs so that API Providers can expose on the portal their APIs that use basic auth for documentation purposes.
- Added input validation for organization name to prevent organization with empty names from being created.

#### Fixed
- Fixed typo in the name of the demo user.
- Rewritten labels for Auth token credentials to remove customers' confusion with opaque names of fields.

## Security Fixes
- [ZipSlip vulnerability](https://nvd.nist.gov/vuln/detail/CVE-2023-27475) in the theme upload flow is now resolved.
- Added input validation for preventing XSS attacks for catalogs and organizations in the admin app.

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.