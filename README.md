[![Build CI](https://github.com/SuchkovSergey/gendiff-utility/actions/workflows/nodejs.yml/badge.svg)](https://github.com/SuchkovSergey/gendiff-utility/actions/workflows/nodejs.yml)
[![Tests CI](https://github.com/SuchkovSergey/gendiff-utility/actions/workflows/nodejstests.yml/badge.svg)](https://github.com/SuchkovSergey/gendiff-utility/actions/workflows/nodejstests.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/4445714ff22e2a22d2e5/maintainability)](https://codeclimate.com/github/SuchkovSergey/gendiff-utility/maintainability)

## Gendiff utility

### About

Gendiff utility provides the opportunity of comparing two files in three different
extensions:

- json
- yml
- ini

There are three types of possible formats you can choose to watch the difference:

- branch
- plain
- json

### Installing

```
npm install gendiff
```

### Using

```
gendiff </path/to/fileOne> </path/to/fileTwo> [format]
```

### Examples of gendiff utility usage

for JSON-format:

<a href="https://asciinema.org/a/fr4q41ssUnpa4JWaz10BVJnVY"><img src="https://asciinema.org/a/fr4q41ssUnpa4JWaz10BVJnVY.png" width="250"/></a>

for YML-format:

<a href="https://asciinema.org/a/R8fqtNZaQdbv64GRAqXD2lgnW"><img src="https://asciinema.org/a/R8fqtNZaQdbv64GRAqXD2lgnW.png" width="250"/></a>

for INI-format:

<a href="https://asciinema.org/a/fREfHzaoXAh3ZvDbyP91ztuNd"><img src="https://asciinema.org/a/fREfHzaoXAh3ZvDbyP91ztuNd.png" width="250"/></a>
