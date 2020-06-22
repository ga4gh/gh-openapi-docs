## Cloud WS Docs Build Migration

This guide is intended for maintainers of API specification repositories for the GA4GH Cloud Work Stream, including

+ [WES]()
+ [TRS]()
+ [DRS]()
+ [TES]()

Each of these repos was previously configured to build and host docs based on the following tools:

+ **`swagger2markup`** gradle plugin and **`asciidoctor`** to (1) automatically generate human-readable asciidoc files from the OpenAPI (swagger) yaml spec; and (2) incorporate
manual content to build an overall document in HTML and PDF formats
+ modified/simplified scripts from the Node.js package [**generator-openapi-repo**](https://github.com/Rebilly/generator-openapi-repo) to set up Swagger UI stuff for the repo
+ other shell scripts and a bunch of custom Travis configuration to manage compiling/building assets as well as fetching/storing data in the right place on the `gh-pages` branch

You can find more details about the full setup in [**this PR**](https://github.com/ga4gh/data-repository-service-schemas/issues/194#issue-382434721).

The system is not especially stable, and requires a lot of unrelated (to the spec) dependencies to live in the repo. It also only works with OpenAPI/Swagger 2.0, due to limitations with `swagger2markup`.

The `gh-openapi-docs` library is designed to address many of these issues and simplify the workflow and dependencies for repo maintainers.

---

## Setup

### Create a new branch off `develop`

This can be done in the same repo or in a fork. For simplicity, I'll refer to this branch as `new-docs-build` (but you can name it whatever).

### Remove old build dependencies and artifacts

> **Note:** this step can technically be saved for later, but it's helpful to declutter the repo before subsequent changes.

On the `new-docs-build` branch, delete the following files from your repository (use `git rm` or `git rm -f` so that files and folders are removed from version control):

```
.
├── build.gradle
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gulpfile.js
├── package-lock.json
├── package.json
├── scripts
│   ├── buildui.js
│   ├── fetchpages.sh
│   └── stagepages.sh
└── settings.gradle
```

I also recommend deleting (via `git rm`) the following artifacts:

```
docs
├── html5
│   └── index.html
└── pdf
    └── index.pdf
```

Feel free to commit at this point, but I would hold off on pushing to remote until making a few other updates below.

## Organization

Below are some notes about how to organize files in your repo, particularly within the folder that contains your Swagger/OpenAPI spec. You can name this folder anything you want, but the common convention for GA4GH APIs is `openapi/` located at the top level of the repo.

### OpenAPI "root"

Whether you choose to store all relevant information for your API spec in a single doc or take advantage of YAML/JSON `$ref` resolution to create a more modular directory structure<sup>\*</sup> you'll need a primary entrypoint file for the API docs content. In many cases, this file will be named `openapi.yaml` (or for older versions, `swagger.yaml`), but you can elect to provide a bit more semantic context in the filename (e.g., `workflow_execution_service.openapi.yaml`).

<sup>\*</sup> For more information about how to organize your spec content into multiple subdirectories, see the usage notes in the package `README`.

### AsciiDoc to Markdown

The previous  build system relied on AsciiDoc files to store additional text that could be inserted into the rendered version of the spec. For example, `front_matter.adoc`:

```adoc
== Executive Summary

The Workflow Execution Service (WES) API provides a standard way for users to submit workflow requests to workflow execution systems, and to monitor their execution. This API lets users run a single workflow (currently https://www.commonwl.org/[CWL] or http://www.openwdl.org/[WDL] formatted workflows, other types may be supported in the future) on multiple different platforms, clouds, and environments.

Key features of the API:

* can request that a workflow be run
* can pass parameters to that workflow (e.g. input files, cmdline arguments)
* can get information about running workflows (e.g. status, errors, output file locations)
* can cancel a running workflow
```

With the new tools from **Redocly**, we can use standard markdown for all our text editing and formatting needs. The simplest way to insert markdown is directly under the `description` attribute — for pretty much any OpenAPI object that has a `description`. For example, I can add the same "executive summary" content as above (now formatted in markdown) for the `description` in the top level `info` section:

> **Note:** the `>` symbol is important to include so that line breaks are properly escaped.

```yaml
openapi: 3.0.0
info:
  title: Workflow Execution Service
  contact: {}
  version: '1.0.1'
  description: >
    # Executive Summary

    The Workflow Execution Service (WES) API provides a standard way for users to submit workflow requests to workflow execution systems, and to monitor their execution. This API lets users run a single workflow (currently [**CWL**](https://www.commonwl.org/) or [**WDL**](http://www.openwdl.org/) formatted workflows, other types may be supported in the future) on multiple different platforms, clouds, and environments.

    Key features of the API:

    - can request that a workflow be run
    - can pass parameters to that workflow (e.g. input files, cmdline arguments)
    - can get information about running workflows (e.g. status, errors, output file locations)
    - can cancel a running workflow
```

By default, the API description (under `info.description`) will be inserted at the top of the rendered docs, thereby replicating the behavior of the previous "front matter" content. However, for more control over layout and organization, see the next section about using **tags** to manage sections of text.

Once you have your AsciiDoc material translated to markdown somewhere, feel free to delete (`git rm`) any of the old `.adoc` files — e.g.:

```
docs
└── asciidoc
    ├── front_matter.adoc
    └── index.adoc
```

### Adding tags

By using separate markdown documents and using `$ref` pointers to write the `description` field for individual `tags` in the root specification file, we can compose rich sections of text and arrange them in flexible ways. For exmaple...

```yaml
tags:
  # 'Echo' and 'User' are the main paths in the spec
  - name: Echo
    description: Example echo operations
  - name: User
    description: Operations about user
  # Introduction includes some backround that I'd like to 
  # include at the beginning of the docs
  - name: Introduction
    description:
      $ref: ./tags/introduction.md
  # This last section I'll include at the end in as part
  # of the "appendix"
  - name: Markdown Descriptions
    description:
      $ref: ./tags/markdown_ex.md
# 'x-tagGroups' is an extension that instructs redoc 
# on how to arrange and order sections
x-tagGroups:
  - name: Overview
    tags:
      - Introduction
  - name: Operations
    tags:
      - Echo
      - User
  - name: Appendix
    tags:
      - Markdown Examples
```

The `introduction.md` and `markdown_ex.md` files, stored relatively in the `openapi/tags` folder, would include headers and content in standard syntax, Which are inserted as markdown (and can be rendered as HTML) in the bundled spec.

To see a more detailed example of how I've organized content for the WES API, see [this link](https://github.com/ga4gh/workflow-execution-service-schemas/tree/master/openapi).

## Configuration

See [README section on Configuration](../README.md#Configuration).

## Continuous Integration

Now you should be ready to add the docs build to your CI script/workflow

> **Note:** for the WES repo, the only non-default value in the config is for `apiSpecPath`, which is set to `"openapi/workflow_execution_service.openapi.yaml"`.

### TravisCI

Add the following as a `stage` in your `.travis.yml` config:

```yaml
    - stage: build_docs
      language: node_js
      node_js:
        - "12"
      before_script:
      - npm install -g @redocly/openapi-cli \
          && npm install -g redoc-cli
      - npm install -g @ga4gh/gh-openapi-docs
      script:
      - gh-openapi-docs
      deploy:
        provider: pages
        skip-cleanup: true
        keep_history: true
        github-token: $GITHUB_TOKEN
        on:
          all_branches: true
```

With this update in place, go ahead and push to your remote branch and create a new pull request against `develop`.

## Merge to `develop`

Assuming that the CI build above succeeds, you can then merge all changes into `develop` in the main API schema repo.

## Cleanup `gh-pages` branch

First, merge the latest version of `develop` into your `gh-pages` branch, then you can remove any old and unused folders and files.

Some of these might already be taken care of with commits from `develop`, but go ahead and delete any existing artifacts in the `docs/` folder — `README.md` is OK to leave if it exists.

> **Note:** because we haven't yet merged anything to `master`, there shouldn't be any outputs from the new docs build system to worry about.

```
docs
├── asciidoc
│   ├── front_matter.adoc
│   └── index.adoc
├── html5
│   └── index.html
└── pdf
    └── index.pdf
```

I strongly recommend deleting any old folders with docs artifacts for deleted or stale branches (eventually, the `gh-openapi-docs` should provide this functionality as an optional step to automate). For the example below, this would include anything under `preview/feature/` or `preview/hotfix/` (these are all subfolders, so you'll need to use `git rm -f`). It should also be safe to delete `swagger-ui/`, `swagger.json`, and `swagger.yaml` under `preview/develop/`.

```
preview
├── develop
│   ├── docs
│   ├── swagger-ui
│   ├── swagger.json
│   └── swagger.yaml
├── feature
│   ├── issue-126-update-docs-build
│   ├── issue-128-update-readme-contrib
│   ├── issue-135-json-schema
│   ├── issue-44-clarify-supported-schemes
│   └── wes-3.0-schema
├── hotfix
│   └── copyright
└── new-docs-build
    ├── docs
    ├── openapi.json
    └── openapi.yaml
```

## Update `master`

Find yourself a drink, cross your fingers, and create a PR to merge `develop` into `master`. This might also be a good time to create a new "patch" tag/release for the repo.