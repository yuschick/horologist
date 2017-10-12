## Contributing to TickTock

Thank you for your interest in contributing to TickTock! This document will help serve as a guide to contributing.

### File Structure

- `/index.js` is the primary file used for the library. This is auto generated with each build.
- `/src/index.js` is a disposable reference file.
- `/src/modules/` houses each complication's component and is where almost all work will be done.
- `/dist/` is production files that are auto generated

### Workflow

There is a general workflow that should be followed when forking the repo and working locally that should be followed before creating a PR.

1. Fork and Clone the repo locally
2. Navigate to the directory and run `yarn` or `npm install`
3. `yarn watch` will run the local dev server
4. Test your work in `/index.html` to look for any errors, warnings, or broken components elsewhere
5. Once everything looks to be working `/index.html`, run `yarn build` to compile all the code and run the corresponding NPM scripts

**After Build**

6. Update `/index.js/` import statements from `./modules/*` to `./dist/modules/*`
7. Replace ./dist/modules with /dist/src/modules
8. Delete ./dist/src/[now empty]
9. Commit your code with a meaningful commit message
10. Create a PR detailing the work that was done and referencing any relevant issue(s) to the work


