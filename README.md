# Demo Typescript Inversify App

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=RJPearson94/demo-typescript-inversify-app&identifier=189883733)](https://dependabot.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A monorepo to prototype using Inversify. Inversify was used to develop the following applications:

| App                                         | Pipeline                                                                                                                                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Azure Function](./packages/azure-function) | [![Actions Status](https://github.com/RJPearson94/demo-typescript-inversify-app/workflows/Azure%20Function%20Pipeline/badge.svg)](https://github.com/RJPearson94/demo-typescript-inversify-app/actions) |
| [Cloud Function](./packages/azure-function) | [![Actions Status](https://github.com/RJPearson94/demo-typescript-inversify-app/workflows/Cloud%20Function%20Pipeline/badge.svg)](https://github.com/RJPearson94/demo-typescript-inversify-app/actions) |
| [Express Web App](./packages/web-app)       | [![Actions Status](https://github.com/RJPearson94/demo-typescript-inversify-app/workflows/Web%20App%20Pipeline/badge.svg)](https://github.com/RJPearson94/demo-typescript-inversify-app/actions)        |
| [Lambda Function](./packages/lambda)        | [![Actions Status](https://github.com/RJPearson94/demo-typescript-inversify-app/workflows/Lambda%20Pipeline/badge.svg)](https://github.com/RJPearson94/demo-typescript-inversify-app/actions)           |

## Repository Structure

As the repository consists of many packages some common/ core code and others as the releasable artefacts. A monorepo was used to reduce the complexity of sharing code between packages. Yarn workspaces is used to manage the monorepo.

The repository structure is as follows:

```
demo-typescript-inversify-app
+-- packages
    +-- azure-function
        +-- ...
        +-- package.json
    +-- cloud-function
        +-- ...
        +-- package.json
    +-- core
        +-- ...
        +-- package.json
    +-- lambda
        +-- ...
        +-- package.json
    +-- web-app
        +-- ...
        +-- package.json
+-- ...
+-- package.json
```

For more information see the **README** of each of the packages

## Getting Started

You will need:

- [Nodejs](https://nodejs.org/en/)
- [Yarn Classic](https://classic.yarnpkg.com/lang/en/)
- Command Prompt

Once you have Yarn installed, open a command prompt at the root of this project and run

```sh
yarn install
```

This will download all the dependencies for all packages and symlink all packages defined within the packages folder.
