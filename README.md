# Project Template

This repo is a project skeleton for a general project. It will evolve as project needs change and other improvements are added.

Currently, the setup includes:
- NPM Scripts
- PostCSS leveraging Autoprefixer
- Babel w/ es-2015 presets
- Autoprefixer
- Browserslist set to past 3 versions
- Webpack
- Docco
- Imagemin
- Mocha
- Minifier

### Getting Started

- Clone the repo
- Using Terminal or CMD, navigate into the top level directory containing the repo files
- `yarn` to install all devDependencies for the project
- `yarn watch` to begin listening to any changes to SCSS or JS files in the source directory
- When 'complete', run `yarn build` to optimize, test, and document the project

### Script Documentation
#### watch

```
yarn watch
```

should be run during development. It will:  
- Spin up a local server and live reload on changes
- Listen for changes in the `./src/styles/` and `./src/js/` directories
- The SCSS files will compile down to `./dist/styles/app.css`
- The scripts/modules will be combined and stored as `./dist/js/app.js`
- Then transpiled with Babel to `es-2015` presets

#### build
```
yarn build
```

should be run at checkpoints throughout a project. It will execute the following:
 - During `prebuild` any tests will be run with Mocha. Errors will quit the build
 - Run `./dist/styles/app.css` through PostCSS back three browser versions
 - Minify styles and scripts into `app.min.css/js`
 - Run image optimization on all images in `./src/images/` and output to `./dist/images/`
 - Create documentation in the `./docs/` directory


#### test
```
yarn test
```

will only run the Mocha tests


### ToDo
- [x] Include localStorage module in `util.js` by default
- [x] Consider using Webpack to spin up the server versus Atom Live Server. Maybe have that be a separate script to provide the option?
- [x] Update Docco to support wildcard selectors, `./src/js/**/*` to handle documentation for all modules  
- [x] Copy image files from `./src/images/` into `./dist/images/`  
