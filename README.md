# My Blog

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Packages used

- [SASS](https://www.npmjs.com/package/sass)
- [React Router DOM](https://www.npmjs.com/package/react-router)
- [React Hook Form](https://www.npmjs.com/package/react-hook-form)
- [React Cookie](https://www.npmjs.com/package/react-cookie)
- [React Modal](https://www.npmjs.com/package/react-modal)

## Prerequisites

- Node/NPM (Check if version matches .node-version)
- A JSON file containing data in articles object format stored in `data/data.json`. [Click here to see a sample](https://gist.github.com/salman-ar-sar/c85b2b1b2e8af7b81d9c9d3d9bfea03c).
- [JSON server](https://www.npmjs.com/package/json-server) watching this JSON and running at port 8000
  - Use this command to run it: `npx json-server --watch data/data.json --port 8000` or run the script for the same in `package.json` using the command: `yarn run json-server`

## Todo

- [x] Confirmation popup on deleting article
- [x] More SCSS integration

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
