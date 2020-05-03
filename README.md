# JSONColorPicker
Load colors in this UI using JSON data for easy organization and copy pasting.  See all of your projects colors at once and select your sort order.  Designed to make viewing all of a project's colors easier to view at once.

Colors are sorted in decreasing HSL order.

### Example
https://ryanpiv.github.io/color-sorter/?turquoise=1abc9c&emerald=2ecc71&carrot=e67e22&alizarin=e74c3c&amethyst=9b59b6&midnightblue=2c3e50&concrete=95a5a6&greensea=16a085&sunflower=f1c40f&clouds=ecf0f1&nephtiris=27ae60&blue=2980b9&color-mid-dark-gray=555555&color-darker-gray=586267&color-yellow=fff2c2&color-light-blue=d6dfe5&color-sky-blue=b7d3e5&color-blue=0099ff&color-dark-blue=006ab2&color-blue-dark=045eb5&color-deep-blue=0089e5&color-blue-endeavour=0061aa&color-curious-blue=3395d6&color-white-blue=f2faff&color-slate-blue=d6dfe5&color-dark-slate=abb1b3&color-darker-slate=82898d&color-purple-gray=6171a9&color-dusty-gray=999&color-gray-whisper=e5e5e5&color-overlay=1e1e1e&color-yellow-highlight=ffe600&color-lighter-blue=fafbfc&color-green-mint=56c288

# Getting Started
```
npm install
npm run start
```

# Deploy
- https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f
```
npm run deploy
```

# TO DO
- Rearrange colors in grid
  - Drag and drop
  - Update colors array with new sort
  - Update local storage / session with new sort
- Detect keyboard paste
  - add confirm dialog when key press detected
  - paste input and process colors array
- Copy all colors to clipboard button
  - Make this work with ctrl c too?
  - add nav item link
- css grid
  - sliders to change grid items
- hex picker to change colors
- allow colors to be renamed from cell
- sort order
- transparency sort inclusion
- different formats of color processing on paste
  - rbg, hsl, sass, hex, etc.
- allow selecting of format for specific colors
  - should also update url to use specified format
- keep original uploaded color vals in array
  - such as rgb(255, 255, 255) should be shown as such, not converted to hex unless specified to


This project was sootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
