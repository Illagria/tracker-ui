# Tracker

This is a ReactJS webapp that talks with a backend to track todos. All todos are linked to you email and persist through refreshes. 

## VSCode Extension recomendations
* Babel JavaScript
* ES7 React/Redux/GraphQL
* ESLint
* GitLens -- Git superchaged
* Jest
* LintLens

## VSCode preferences recomendations
```json
{
    ...
    "editor.codeActionsOnSave": {
        "source.organizeImports": true,
    },
    "eslint.codeAction.showDocumentation": {
        "enable": true
    },
    "eslint.packageManager": "yarn",
    "jest.showCoverageOnLoad": true,
    "jest.pathToJest": "npm test -- --coverage"
}
```

## Getting started locally

0. Have a backend server running locally (add link to backend template projects)

**NOTE:** All commands should be executed from the root of the project unless otherwise stated.

### Developing
1. Install [yarn](https://classic.yarnpkg.com/en/docs/install)
2. Clone this repo.
3. Execute, `yarn install`
4. Execute, `yarn start:local`
5. In web browser navigate to, `http://localhost:3000` and see your sweet sweet app!

#### Adding variables at runtime

Variables will be read from `/public/config.js` and dropped into the app. This allows us to define variables after the app has been built so we don't have multiple builds for each different instance. Instead we have a unique set of vars we just pass it for each new instance using the same build. This also avoids any unneccessary lengthy switch statements for determining variables.

##### Adding new variables
1. Update `/public/config.js.template` with your new variable you need.
2. Update `/scripts/docker_run.sh` and add another _sed_ statement.
3. Add new k,v pair to `helm/values.yaml`
4. Add new entry to `helm/chart/templates/frontend-deployment.yaml` to the array, `spec.template.spec.containers.env` where the name is what it is to be in the app and value is the variable name given in the values.yaml file updated in step 3.

### Running Docker
1. Execute, `docker build .`
2. Execute, `docker images` and grab the **IMAGE_ID** for the just built image
   * Will reference as **I_ID** for remaining instructions
3. Execute, `docker run -p 80:80 -e REACT_APP_API_URL=<YOUR_BACKEND_URL> <I_ID>`
4. In web browser navigate to, `http://localhost` and see your sweet sweet app!
