---
title: "Upgrading Custom Go Plugins"
date: 2024-03-1
tags: ["Upgrade Custom Go Plugins", "Tyk plugins", "Custom Plugins", "Self Managed"]
description: "Explains how to upgrade Go Plugins"
---

This guide shows you how to upgrade your custom Go plugins:
- Navigate into the plugins directory that contains your Go module.
- Use the table below to follow the upgrade process for the version of Tyk you are upgrading to:

| Upgrade process | Current Version | Target Version |
|-----------------|-----------------|----------------|
| [1](#path-1)    | < 4.1.0         | < 4.1.0        |
| [2](#path-2)    | < 4.1.0         | >= 5.1.0       |
| [3](#path-3)    | >= 4.1.0        | >= 5.2.5       |

Additionally, if you are using bundles to ship your plugins, you will need to build and redploy a new plugin bundle. Please consult our supporting documentation that explains how to build and deploy [Tyk plugin bundles]({{< ref "plugins/how-to-serve-plugins/plugin-bundles#global-parameters" >}}).

## Initialise plugin for Gateway versions earlier then 4.2.0 {#path-1}
**Path 1** all versions before 4.2.0

```bash
go get 
github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5

# Tyk Gateway versions < 4.2 have a dependency on graphql-go-tools
go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca

go mod tidy
go mod vendor
```

## Initialise plugin for Gateway versions earlier than 5.1.0 {#path-2}
**Path 2** between Tyk 4.2.0 to 5.1.0

```bash
go get github.com/TykTechnologies/tyk@54e1072a6a9918e29606edf6b60def437b273d0a

# For Gateway versions earlier than 5.1 using the go mod vendor tool is required
go mod tidy
go mod vendor
```

## Initialise plugin for Gateway v5.1 and above {#path-3}

In Gateway version 5.1, the Gateway and plugins transitioned to using Go modules builds and don’t use Go mod vendor anymore

```bash
go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d

go mod tidy
```

Download the plugin compiler for the target Gateway version you’re upgrading to (e.g. 5.2.5). Docker images for plugin compiler versions are available in the [Tyk Docker Hub](https://hub.docker.com/r/tykio/tyk-plugin-compiler/tags). 

```bash
docker pull tykio/tyk-plugin-compiler:v5.2.5
```

Recompile your plugin with this version

```bash
docker run --rm -v `pwd`:/plugin-source \
           --platform=linux/amd64 \
           tykio/tyk-plugin-compiler:v5.2.5 plugin.so
```

Example:
{{< img src="/img/upgrade-guides/recompile_plugin.png" 
    alt="Recompile plugin example" width="600" height="auto">}}

You can remove the plugin complier images once your plugin has been successfully recompiled:

```bash
docker rmi plugin_compiler_image_name_or_id
```