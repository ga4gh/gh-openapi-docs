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

You should add a file named `.spec-docs.json` to the top level of your repo. The following parameters can currently be configured to modify the behavior of the `gh-openapi-docs` build; however, I recommend leaving the defaults for everything except `apiSpecPath` (which will be specific to how and where you've stored the root OpenAPI file).

```json
{
    "apiSpecPath": "openapi/openapi.yaml",
    "docsRoot": "docs",
    "defaultBranch": "master",
    "branchPathBase": "preview"
}
```

+ **`apiSpecPath`:** relative path to the OpenAPI spec root file | default: `"openapi/openapi.yaml"` (i.e., `<repoRoot>/openapi/openapi.yaml`)
+ **`docsRoot`:** folder `dirname` and path for where rendered outputs are to be stored | default: `"docs"` (i.e., `<repoRoot>/docs/` or `<repoRoot>/preview/<branchName>/docs/` depending on the active branch)
+ **`defaultBranch`:** the default branch, typically as defined in your GitHub settings for the repo; however, the package doesn't explicitly check these settings, so consider "default" to indicate which version is hosted at `https://ga4gh.github.io/<repoName>/docs`, whereas all content for all other branches will be hosted at `https://ga4gh.github.io/<repoName>/preview/<branchName>/docs` | default: `"master"`
+ **`branchPathBase`:** name used for the folder where content for any non-default branches will be stored and hosted | default: `"preview"`

## Outputs

This package is designed to create artifacts in the following path(s):

- `{branchPath}/docs/index.html`
- `{branchPath}/openapi.json`
- `{branchPath}/openapi.yaml`

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
