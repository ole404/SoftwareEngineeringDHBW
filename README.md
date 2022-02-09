# Tannder

TODO: write about app

## Prereq: Google-Cloud Account

In order to use the Backend properly, a Google-Cloud account is needed. Please follow the Tutorial for the vision api authentication and projekt set-up on [this webiste](https://cloud.google.com/vision/docs/labels#set-up-your-gcp-project-and-authentication). After succesfully creating an account, download the config file and rename it to `gcloud.json` and paste it into the `server` folder.

## Run (Production)

**Note:** Please ensure you can run `docker-compose` commands. To install docker visist the [Docker Homepage](https://www.docker.com/get-started)

To start the application in `production` mode run one of the following commands:

```sh
cd docker
docker-compose up

# Alternativ
docker-compose -f docker/docker-compose.yaml up
```

This will compile the TypeScript `server` and build the Ionic `client` and optimize the application for production mode. This will take a moment, so grab a cup of coffee and relax. Then the TypeScript Express `server` starts and serves the static Ionic `client`. The application should start on [localhost](http://localhost) (Port 80).

## Develop (Local)

To open the project in VS Code open the tannder.code-workspace file. E.g. from command line:

```sh
code ./.vscode/tannder.code-workspace
```

Then install all the recommended extensions. This will enable automated code lints and format on save.

### MongoDB

**Best Practice:** Start MongoDB in a docker container:

```sh
cd server
npm run start:db
```

or native

```sh
docker run --rm -p 27017:27017 --name tannder-dev-db -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin mongo:latest
```

_Note that the container has no volume attached, so all data gets lost after a restart!_

### Express Server

**Note:** Before starting the server please ensure that the `MongoDB` started!

After succesfully creating an account, download the config file and rename it to `gcloud.json` and paste it into the `server` folder.

To start the `server` in development mode run:

```sh
cd server
npm run start:dev
```

### Ionic Client

You must install the `ionic-cli` globally with:

```sh
npm install -g @ionic/cli
```

Then the `client` can started in development mode with:

```sh
cd client
npm run start
```

### Linting and formatting

To lint any of `client` or `server` code run `npm run lint`. To format use `npm run format`. However, if you opened the project as VS Code Workspace with the `./.vscode/tannder.code-workspace` file, the code should format on save.

Maybe you need to install `eslint` globally with:

```sh
npm i -g eslint
```

## Contributing

Please check out our [Contributing Wiki](./contributing.md)
