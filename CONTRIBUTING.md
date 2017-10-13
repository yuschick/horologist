## Contributing to TickTock

Thank you for your interest in contributing to TickTock! This document will help serve as a guide to contributing.

Until further rules are in place, please follow existing:

- naming conventions
- spacing and indenting
- offloading re-usable functionality to parent Watch class

### File Structure

- `/src/index.js` is the source working file for the master Watch class.
- `/src/modules/` houses each complication's component and is where almost all work will be done.
- `/dist/` is production files that are auto generated

### Workflow

1. After cloning the repo locally, run `yarn watch` to spin up the local server
2. Work in `/index.html` (or a separate `.html` file) to test your work and look for any errors, warnings, or broken components elsewhere
3. Once everything looks to be working, run `yarn build` to compile all the code and run the corresponding NPM scripts

### Commits and Pull Requests

- Commit your code with a meaningful commit message
- Create a PR detailing the work that was done and reference any relevant issue(s) to the work


