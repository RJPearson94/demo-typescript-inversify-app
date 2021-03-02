# Demo Typescript Inversify App

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
- [Yarn](https://yarnpkg.com)
- Command Prompt

Once you have Yarn 2 (Yarn Berry) installed, open a command prompt at the root of this project and run

```sh
yarn install
```

This will download all the dependencies for all packages and symlink all packages defined within the packages folder.
