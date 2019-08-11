# Demo Typescript Inversify App

[![CircleCI](https://circleci.com/gh/RJPearson94/demo-typescript-inversify-app.svg?style=svg&circle-token=3ec1080a6d9cb88533235c700780d342a1d088ff)](https://circleci.com/gh/RJPearson94/demo-typescript-inversify-app)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=RJPearson94/demo-typescript-inversify-app&identifier=189883733)](https://dependabot.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

A monorepo to prototype using Inversify within a Express Web App & Lambda Function.

## Repository Structure

As the repository consists of many packages some common/ core code and others as the releasable artefacts (Lambda & Terraform zip/ Docker container) a monorepo was used to reduce the complexity of sharing code between packages. To manage the packages and monorepo [lerna](https://lerna.js.org/) is used.

The repository structure is as follows:

```
demo-typescript-inversify-app
+-- packages
    +-- core
        +-- ...
        +-- package.json
    +-- lambda
        +-- ...
        +-- package.json
    +-- web-app
        +-- ...
        +-- package.json
+-- lerna.json
+-- package.json
```

For more information see the **README** of each of the packages

## Getting Started

You will need:

- Nodejs (<https://nodejs.org/en/>)
- Yarn (<https://yarnpkg.com>)
- Command Prompt

Once you have Yarn installed, open a command prompt at the root of this project and run

```sh
yarn install
```

This will download all the dependencies for the root package.json only, to install/ link all dependencies within the repository together lerna's bootstrap command is used. The command can be run using the following command

```sh
yarn lerna bootstrap
```
