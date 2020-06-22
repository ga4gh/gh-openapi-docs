## Structuring your repo for modular API docs

See the [**Redoc.ly** docs](https://redoc.ly/docs/resources/multi-file-definitions/) for an overview on working with `$ref`s and structuring multi-file OpenAPI definitions.

For an example of how to employ this organization, refer to [this folder](test/test-spec/split):

```
test/test-spec/split
├── README.md
├── components
│   ├── README.md
│   ├── headers
│   │   ├── ExpiresAfter.yaml
│   │   └── Overview.yaml
│   ├── schemas
│   │   ├── Email.yaml
│   │   └── User.yaml
│   └── securitySchemes
│       ├── api_key.yaml
│       ├── basic_auth.yaml
│       └── main_auth.yaml
├── openapi.yaml
├── paths
│   ├── README.md
│   ├── echo.yaml
│   └── users@{username}.yaml
└── tags
    ├── README.md
    ├── introduction.md
    └── openapi_spec.md
```

The root OpenAPI spec that defines how these various pieces fit together can be found in the [`test/test-spec/split/openapi.yaml` file](../../test/test-spec/split/openapi.yaml). 
