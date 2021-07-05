# GitHub OpenAPI Docs

[![Build Status](https://travis-ci.org/ga4gh/gh-openapi-docs.svg?branch=master)](https://travis-ci.org/ga4gh/gh-openapi-docs) [![Coverage Status](https://coveralls.io/repos/github/ga4gh/gh-openapi-docs/badge.svg?branch=master&service=github)](https://coveralls.io/github/ga4gh/gh-openapi-docs?branch=master&service=github) [![npm](http://img.shields.io/npm/v/gh-openapi-docs.svg)](https://www.npmjs.com/package/gh-openapi-docs) [![License](https://img.shields.io/npm/l/gh-openapi-docs.svg)](https://github.com/ga4gh/gh-openapi-docs/blob/master/LICENSE)

The `gh-openapi-docs` package can be used to build ReDoc API documentation for an OpenAPI specification (no server implementation required) and host on GitHub Pages. Some features and configuration are slightly opinionated, based on experiences developing standard APIs with the [**Global Alliance for Genomics & Health (GA4GH)**](https://www.ga4gh.org/), but should be generalizable to most repos working with Swagger/OpenAPI.

> **Note:** this package is intended to be used with an existing repo via a [config file](#Configuration) and continuous integration. To install and run locally, refer to the steps below.

This project was *heavily* bootstrapped with outstanding products from the [**Redoc.ly**](https://redoc.ly/) team:
+ [**redoc**](https://github.com/Redocly/redoc) - OpenAPI/Swagger-generated API Reference Documentation
+ [**openapi-cli**](https://github.com/Redocly/openapi-cli) - OpenAPI 3 CLI toolbox with rich validation and bundling features
+ with additional inspiration and examples from [**create-openapi-repo**](https://github.com/Redocly/create-openapi-repo)

An additional shoutout to [**redoc-editor**](https://github.com/pointnet/redoc-editor) from @pointnet, which was greatly helpful in designing a GA4GH-specific theme.

---

## Installation

Install command-line dependencies:

```shell
npm install -g @redocly/openapi-cli && npm install -g redoc-cli
```

Install CLI:

```shell
npm install -g @ga4gh/gh-openapi-docs
```

## Configuration

You should add a JSON config file to your repo. We recommend naming the file `.spec-docs.json` and placing it at the top level of you repo, as the application reads from this file by default.

You may name the file anything, provided it is specified in the command via the `--config` option. For example, for a config file named `my-docs-config.json`, you would run:

```
gh-openapi-docs --config my-docs-config.json
```

The following parameters can currently be configured to modify the behavior of the `gh-openapi-docs` build. We recommend leaving the defaults for `docsRoot`, `defaultBranch`, and `branchPathBase`, while overriding the values of the other properties.

```json
{
    "docsRoot": "docs",
    "defaultBranch": "master",
    "branchPathBase": "preview",
    "redocTheme": "ga4gh",
    "buildPages": [
        {
            "apiSpecPath": "openapi/openapi.yaml",
            "htmlOutfile": "index.html",
            "yamlOutfile": "openapi.yaml",
            "jsonOutfile": "openapi.json"
        }
    ]
}
```

+ **`docsRoot`:** folder `dirname` and path for where rendered outputs are to be stored | default: `"docs"` (i.e., `<repoRoot>/docs/` or `<repoRoot>/preview/<branchName>/docs/` depending on the active branch)
+ **`defaultBranch`:** the default branch, typically as defined in your GitHub settings for the repo; however, the package doesn't explicitly check these settings, so consider "default" to indicate which version is hosted at `https://ga4gh.github.io/<repoName>/docs`, whereas all content for all other branches will be hosted at `https://ga4gh.github.io/<repoName>/preview/<branchName>/docs` | default: `"master"`
+ **`branchPathBase`:** name used for the folder where content for any non-default branches will be stored and hosted | default: `"preview"`
+ **`redocTheme`**: render HTML documentation using a preconfigured themes | Accepted values: `default`, `ga4gh` | default: `"default"`
+ **`buildPages`**: a list of `buildPage` objects
  - Each `buildPage` object indicates an OpenAPI document in the repo that will be bundled and rendered as HTML.
  - `buildPage` properties:
    * `apiSpecPath`: relative path to the OpenAPI spec root file
    * `htmlOutfile`: bundled, human-readable output file name (do not indicate path, HTML doc will be written to directory based on Github branch)
    * `yamlOutfile`: bundled YAML spec output file name (do not indicate path, YAML doc will be written to directory based on Github branch)
    * `jsonOutfile`: bundled JSON spec output file name (do not indicate path, JSON doc will be written to directory based on Github branch)


## Outputs

This package is designed to create 3 artifacts per `buildPage` entry in the config file. Artifacts will be written to the following path(s):

- `{branchPath}/docs/{htmlOutfile}` -> bundled HTML documentation
- `{branchPath}/{yamlOutfile}` -> bundled YAML spec
- `{branchPath}/{jsonOutfile}` -> bundled JSON spec

Where `branchPath` is the repo root if the current branch is `defaultBranch` (typically `master`), otherwise `preview/<branchName>`.

**Note:** OpenAPI specs for testing can be found at [`test/test-spec/combined/openapi.yaml`](test/test-spec/combined/openapi.yaml) and [`test/test-spec/split/openapi.yaml`](test/test-spec/split/openapi.yaml).

## Usage

Run the command...

```shell
gh-openapi-docs
```

You should see console logs that look like this:

```shell
Preparing docs for API spec at 'openapi/openapi.yaml' (develop)

Cloning 'gh-pages' branch into '<repo-path>/.ghpages-tmp'

Branch folder:
<repo-path>/preview/develop

API spec (root) location:
<repo-path>/openapi/openapi.yaml

Bundling API spec...

Storing bundled 'openapi.json' and 'openapi.yaml' in:
<repo-path>/preview/develop/

Generating standalone ReDoc HTML:
<repo-path>/preview/develop/docs/index.html

Done (in 5s.)
```
