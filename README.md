# Tannder

## Run

In order to run the application a Google API-Key is needed, also docker must be installed.

### Google-Cloud Account

In order to use the Backend properly, a Google-Cloud account is needed. Please follow the Tutorial for the vision api authentication and projekt set-up on [this webiste](https://cloud.google.com/vision/docs/labels#set-up-your-gcp-project-and-authentication). After succesfully creating an account, download the config file and rename it to `gcloud.json` and paste it into the `server` folder.

### Run with docker-compose

Please ensure you can run `docker-compose` commands. To install docker visist the [Docker Homepage](https://www.docker.com/get-started)

To start the application in `production` mode run one of the following commands:

```sh
cd docker
docker-compose up

# Alternativ
docker-compose -f docker-compose.yaml up
```

This will compile the TypeScript `server` and build the Ionic `client` and optimize the application for production mode. Then the TypeScript Express `server` starts and serves the static Ionic `client`. The application should start on [localhost](http://localhost) (Port 80).

## Develop

To open the project in VS Code open the tannder.code-workspace file. E.g. from command line:

```sh
code ./.vscode/tannder.code-workspace
```

Then install all the recommended extensions. This will enable automated code lints and format on save.

### Express Server

In order to use the Backend properly, a Google-Cloud account is needed. Please follow the Tutorial for the vision api authentication and projekt set-up on [this webiste](https://cloud.google.com/vision/docs/labels#set-up-your-gcp-project-and-authentication).
After succesfully creating an account, download the config file and rename it to `gcloud.json` and paste it into the `server` folder.

### Linting and formatting

To lint any of `client` or `server` code run `npm run lint`. To format use `npm run format`. However, if you opened the project as VS Code Workspace with the `./.vscode/tannder.code-workspace` file, the code should format on save.

### MongoDB

**Best Practice:** Start MongoDB in a docker container:

```sh
docker run --rm -d -p 27017:27017 --name tannder-dev-db -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin mongo:latest
```
