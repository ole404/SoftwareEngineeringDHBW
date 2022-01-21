# Tannder

## VS Code

To open the project in VS Code open the tannder.code-workspace file. E.g. from command line:

```sh
code ./.vscode/tannder.code-workspace
```

Then install all the recommended extensions. This will enable automated code lints and format on save.

## Linting and formatting

To lint any of `client` or `server` code run `npm run lint`. To format use `npm run format`. However, if you opened the project as VS Code Workspace with the `./.vscode/tannder.code-workspace` file, the code should format on save.

## Backend

In order to use the Backend properly, a Google-Cloud account is needed. Please follow the Tutorial for the vision api authentication and projekt set-up on [this webiste](https://cloud.google.com/vision/docs/labels#set-up-your-gcp-project-and-authentication).

After succesfully creating an account, download the config file and rename it to `gcloud.json` and paste it into the `server` folder.

In the server folder run the

```sh
docker-compose up
```

command to start the backend. It should be available on port `3000`.
