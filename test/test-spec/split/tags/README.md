By using separate markdown documents and using `$ref` pointers to write the `description` field for individual `tags` in the root specification file, we can compose rich sections of text and arrange them in flexible ways. For exmaple...

```yaml
tags:
  # 'Echo' and 'User' are the main paths in the spec
  - name: Echo
    description: Example echo operations
  - name: User
    description: Operations about user
  # Introduction includes some backround that I'd like to include
  # at the beginning of the docs
  - name: Introduction
    description:
      $ref: ./tags/introduction.md
  # This last section I'll include at the end in the appendix
  - name: Markdown Descriptions
    description:
      $ref: ./tags/markdown_ex.md
# 'x-tagGroups' instructs redoc on how to arrange and order sections
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

`markdown_ex.md` includes headers and content in standard syntax, Which are inserted as markdown (and can be rendered as HTML) in the bundled spec:

# Table Example

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

# Link Example

Learn more about working with markdown in the [GitHub Guides](https://guides.github.com/features/mastering-markdown/).

# Image Example

<img src="/shared/1200px-Markdown-mark.svg.png"
     alt="Markdown Logo"
     style="float: left; margin-right: 10px;" />