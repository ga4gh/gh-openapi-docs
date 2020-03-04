# gh-schema-docs

## Installation

After cloning this repo...

```shell
npm install -g . && npm install -g swagger-repo
```

## Set up

Within a repo directory that contains an OpenAPI spec, create a config file named `.spec-docs.json` with the relative path to your spec:

```json
{
    "apiSpecPath": "openapi/swagger.yaml",
    "contactUrl": ""
}
```

## Outputs

This package is designed to create artifacts in the following locations:

- `{branchPath}/docs/` (not currently implemented; might be replaced by ReDoc)
- `{branchPath}/swagger-ui/` (might be replaced by ReDoc)
- `{branchPath}/redoc-ui/` (not currently implemented)
- `shared/` (common assets to use for Swagger UI; might be irrelevant with switch to ReDoc)

Where `branchPath` is the repo root if the current branch is `master`, otherwise `preview/<branchName>`.

## Usage

Run the command...

```shell
cloud-schema-docs
```

You should see console logs that look like this:

```shell
{ apiSpecPath: 'openapi/swagger.yaml',
  docsRoot: 'docs',
  uiRoot: 'swagger-ui',
  redocRoot: 'redoc-ui',
  defaultBranch: 'master',
  branchPathBase: 'preview',
  contactUrl: '',
  sha: '<commit-sha>',
  abbreviatedSha: '<abbreviated-commit-sha>',
  branch: 'develop',
  tag: null,
  committer: null,
  committerDate: null,
  author: null,
  authorDate: null,
  commitMessage: null,
  root:
   '<repo-path>',
  commonGitDir:
   '<repo-path>/.git',
  worktreeGitDir:
   '<repo-path>/.git',
  lastTag: null,
  commitsSinceLastTag: Infinity,
  env: undefined,
  repoOrigin:
   'https://github.com/<gh-org>/<repo-name>',
  branchPath:
   '<repo-path>/preview/develop' }

Preparing docs for API spec at 'openapi/swagger.yaml' (develop)
Cloning 'gh-pages' branch into '<repo-path>/.ghpages-tmp'
Cloning into '.'...

...

Bundling API spec...

> <repo-name>-openapi-spec@1.0.0 swagger <repo-path>
> swagger-repo "bundle" "-o" "<repo-path>/preview/develop/openapi.json"

Created "<repo-path>/preview/develop/openapi.json" openapi file.

> <repo-name>-openapi-spec@1.0.0 swagger <repo-path>
> swagger-repo "bundle" "--yaml" "-o" "<repo-path>/preview/develop/openapi.yaml"

Created "<repo-path>/preview/develop/openapi.yaml" openapi file.
Copying Swagger UI index to '<repo-path>/preview/develop/swagger-ui'
Swagger UI folder contents:
index.html

Updating API spec path for '<repo-path>/preview/develop/swagger-ui/index.html'
Done (in 6s.)
```
