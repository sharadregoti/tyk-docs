---
title: Upgrading Tyk
description: Guide for upgrading Tyk components
weight: 251
menu:
    main:
        parent: "FAQ"
---

This page provides guidance for upgrading your Tyk installation. When upgrading Tyk, you need to consider each component (e.g. Gateway, Pump, Dashboard) separately, taking into account the deployment style you've implemented. We have structured this guide by deployment type (e.g. Cloud, Self-Managed, etc.) to keep all the information you need in one place.

## Upgrade standards and recommendations
All our components adhere to a few common standards:

- We do not introduce breaking changes unless specifically stated in the release notes (and it rarely happens).
<<<<<<< dx-1047
- Check our [versioning and long-term-support policies]({{< ref "developer-support/long-term-support-releases" >}}) for more details on the way we release major and minor features, patches and the support dates for each release.
- Make sure you have planned an [upgrade strategy]({{< ref "developer-support/upgrading-tyk/upgrade-strategy" >}}).
- Make sure you have consulted the [upgrade prerequisites]({{< ref "developer-support/upgrading-tyk/upgrade-prerequisites" >}}) before starting the upgrade.
- Make sure you follow our [comprehensive guide for backing up Tyk]({{< ref "frequently-asked-questions/how-to-backup-tyk" >}}) before starting the upgrade.
- If you experience any issues with the new version you pulled, please contact Tyk Support or [Tyk community forum](https://community.tyk.io/).
=======
- Check our [versioning and long-term-support policies]({{< ref "developer-support/special-releases-and-features/long-term-support-releases" >}}) for more details on the way we release major and minor features, patches and the support dates for each release.
- Make sure you follow our [comprehensive guide for backing up Tyk]({{< ref "frequently-asked-questions/how-to-backup-tyk" >}}) before starting the upgrade 
- If you experience any issues with the new version you pulled, please contact Tyk Support or [Tyk community forum](https://community.tyk.io/)


## Upgrade Tyk components in Tyk Cloud 
Tyk Cloud users manage Tyk deployments via the Tyk Cloud Console. You can upgrade Tyk Dashboard and the gateways in the Cloud Data Planes using this console. Please read about [upgrading control planes]({{< ref "tyk-cloud/environments-&-deployments/managing-control-planes#upgrade-control-planes" >}}) to see the exact upgrade steps!

---

## Tyk Gateway Upgrade - Used in Licensed and Open Source Deployments

This section applies to all self-managed components, including licensed and open-source.

All our components share a few common standards:
- Upgrades do not overwrite your configuration files. However, it is a good practice to back up these files routinely (using git or another tool). We strongly recommend taking a backup before upgrading Tyk. The upgrade will deploy new copies of startup scripts, so any customizations should be saved in advance
- You do not need to migrate or run migration scripts for your APIs, policies or other assets created in Tyk unless specifically stated in the release (and it rarely happens).
- Upgrading is trivial and similar to any other product upgrade done in Linux, Docker, Kubernetes, or Helm. It essentially means pulling the new images from public directories. You can find the list of all our releases in the following links:
  - Docker & Kubernetes - [Docker Hub - https://hub.docker.com/u/tykio](https://hub.docker.com/u/tykio)
  - Helm install - [Artifact Hub - https://artifacthub.io/packages/search?repo=tyk-helm](https://artifacthub.io/packages/search?repo=tyk-helm)
  - Linux - [Packagecloud - https://packagecloud.io/tyk](https://packagecloud.io/tyk)
- The above repositories will be updated when new versions are released

#### Production Environment Upgrade
Regardless of your deployment choice (Linux, Docker, Kubernetes), we recommend the following upgrade process:
 1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
 2. Get/update the latest binary (i.e. update the docker image name in the command, Kubernetes manifest or values.yaml of Helm chart or get the latest packages with `apt get`)
 3. Use deployment's best practices for a rolling update (in local, non-shared, non-production environments simply restart the gateway)
 4. Check the log to see that the new version is used and that the gateway is up and running
 5. Check that the gateway is healthy using the open `/hello` API.

### Docker Upgrade

#### Development environment
In a development environment where you can simply restart your gateways, follow these steps:

1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the docker command or script
3. Restart the gateway. For example, update the following command to `v5.1` and run it as follows:

```console
$ docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:v5.1
```
>>>>>>> master


## Upgrade Guides

Tyk provide upgrade guides for a variety of platforms.

### Tyk Cloud 

Tyk Cloud users manage Tyk deployments via the Tyk Cloud Console. You can upgrade Tyk Dashboard and the Gateways in the Cloud Data Planes using this console. Please consult our upgrade guides for [Cloud SaaS]({{< ref "developer-support/upgrading-tyk/cloud/cloud-saas/" >}}) and [Hybrid SaaS]({{< ref "developer-support/upgrading-tyk/cloud/hybrid/" >}}) to learn more!

### Self Managed

Please consult our guides for upgrading Tyk Gateway in a self managed environment for [RHEL (CentOS)]({{< ref "developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-rpm" >}}) and [Debian]({{< ref "developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-deb" >}}) Linux distributions.

### Other

We also offer upgrade guides for:
- [Docker]({{< ref "developer-support/upgrading-tyk/other-upgrade-options/docker" >}})
- [Helm]({{< ref "developer-support/upgrading-tyk/other-upgrade-options/helm" >}})
- [Kubernetes]({{< ref "developer-support/upgrading-tyk/other-upgrade-options/kubernetes" >}})

---

## Upgrade Tools

Tyk offer support upgrading tools to migrate database platform and backup APIs and policies.

#### Migrating from MongoDB to SQL

We have a [migration tool]({{< ref "planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}) to help you manage the switch from MongoDB to SQL.

#### Backup Script

We provide a bash [backup script]({{< ref "developer-support/backups/backup-apis-and-policies" >}}) that you can use to export and restore all Tyk API Definitions and Policies.

---

## Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)
