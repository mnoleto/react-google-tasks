# ReactGoogleTasks

Featuring universal Redux, React Router, React Router Redux Hot reloading, SASS and Google task REST API.

[Google task REST API](https://developers.google.com/google-apps/tasks/)

[Google task manager example](https://mail.google.com/tasks/canvas?pli=1)

## Get Started
1. **Clone the project**. `git clone https://github.com/mnoleto/react-google-tasks.git`.
2. **Install dependencies**. `npm install`.
3. **Run the setup script**. `npm run setup`
4. **Run in watch mode**. `npm start -s`
5. **Run the deploy**. `npm run build`
This will run the automated build process, start up a webserver, and open the application in your default browser.

## Google key authentication
To uses the Google standard API you must include an API Key at /src/config/secrets.js and on the credentials page you must enable OAuth 2.0 client IDs and authorize the URL of the client application: Authorize Javascript origins and Authorize redirect URLs.
[Get a Key](https://developers.google.com/maps/documentation/javascript/get-api-key)

##Technologies

| **Tech** | **Description** |
|----------|-------|---|
|  [React](https://facebook.github.io/react/)  |   Fast, composable client-side components.    |
|  [Redux](http://redux.js.org) |  Enforces unidirectional data flows and immutable, hot reloadable store. Supports time-travel debugging. Lean alternative to [Facebook's Flux](https://facebook.github.io/flux/docs/overview.html).|
|  [React Router](https://github.com/reactjs/react-router) | A complete routing library for React |
|  [Babel](http://babeljs.io) |  Compiles ES6 to ES5. Enjoy the new version of JavaScript today.     |
|  [Webpack](http://webpack.github.io) | Bundles npm packages and our JS into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). |
| [Browsersync](https://www.browsersync.io/) | Lightweight development HTTP server that supports synchronized testing and debugging on multiple devices. |
| [Mocha](http://mochajs.org) | Automated tests with [Chai](http://chaijs.com/) for assertions and [Enzyme](https://github.com/airbnb/enzyme) for DOM testing without a browser using Node. |
| [Isparta](https://github.com/douglasduteil/isparta) | Code coverage tool for ES6 code transpiled by Babel. | 
| [TrackJS](https://trackjs.com/) | JavaScript error tracking. |
| [ESLint](http://eslint.org/)| Lint JS. Reports syntax and style issues. Using [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) for additional React specific linting rules. | |
| [SASS](http://sass-lang.com/) | Compiled CSS styles with variables, functions, and more. |
| [PostCSS](https://github.com/postcss/postcss) | Transform styles with JS plugins. Used to autoprefix CSS |
| [Editor Config](http://editorconfig.org) | Enforce consistent editor settings (spaces vs tabs, etc). |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. | 
