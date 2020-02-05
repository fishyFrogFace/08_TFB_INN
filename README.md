This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## GitHub guidelines
- When developing a feature, a new branch should be created.
### `git checkout -b my_feature_name`
- Always check what branch you are on and what files are added or currently contain changes.
### `git status`
- Write descriptive commit messages.
- Make new commits often. When pushing to a feature branch, your code does not have to be perfect. Small commits should be the norm.
### `git add src/components/NewComponent.tsx`
### `git status`
### `git commit -m "Made a new component"`
### `git push origin my_feature_name`
- Pushes directly to master should be avoided when possible. Pushing to master triggers a build of the code and the application will deploy if the tests pass.
- When a feature is done, create a pull request from the GitHub website.
