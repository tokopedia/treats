---
id: how-to-contribute
title: How To Contribute
sidebar_label: How To Contribute
---

Treats is still under active development and is also being used by teams across Tokopedia. With that said, we're still working out to make contributing to Treats as easy and as transparent as possible, but it doesn't close the door for you to help make Treats better than it is today! Hopefully this document answers common questions that you may have.

## Code of Conduct
We have code of conduct that we expect project participants to adhere to. Please read [our code of conduct](https://github.com/tokopedia/treats/blob/master/CODE_OF_CONDUCT.md)
 so that you can understand what actions will and will not be tolerated.

## Development
All work on Treats happens directly on [Github](https://github.com/tokopedia/treats).

### Branching Strategy
All pull request should be done against the `master` branch. We'll keep maintaining stable branches for major versions separately but we don't accept pull requests to them directly.

### Semantic Versioning
Treats follows [semantic versioning](http://semver.org/). We release patch versions for bugfixes, minor versions for new features, and major versions for any breaking changes.

### Your First Pull Request
We have a list of **[good first issues](https://github.com/tokopedia/treats/issues?q=is:open+is:issue+label:"good+first+issue")** that contain bugs that have easier and limited scope. This is a great place to get your hands dirty and get you started for your first pull request.

### Where to Publish Issues
We use [GitHub Issues](https://github.com/tokopedia/treats/issues) for public bugs. Before filing any issues, please try to check if your issue are already filed by someone from our community member or not.

### Security Bugs
Tokopedia has a [bug bounty program](https://github.com/tokopedia/bug-bounty) for the safe disclosure of security bugs. Instead of filing regular public issues, please go through that process.

### Development Workflow
Treats uses monorepo structure so each package that are part of Treats environment are living under `packages` directory in the repository.

To make it easier for us to keep the code styling standard applied across these packages, we uses the same linter, code formatter and testing framework that lived on the top level of the repository. There's several commands that might be useful while you're working on your changes:

* `yarn lint` checks the code style.
* `yarn test` runs the complete test suite.
* `yarn test:watch` runs an interactive test watcher.
* `yarn prettier` automatically format code styling with prettier.

We also have automated sanity checks before you're commiting changes to make sure your codes adhere to the existing code styling standard and eliminate any unwanted regressions. However it is still recommended for you to try your build in a real project.

If you want to try your changes in your existing Treats project, you may delete `treats` and other addons/packages that you want to test in its dependencies and use `yarn link` to point them to your local Treats folder:

```
cd ~/path_to_your_treats_clone/packages/treats
yarn link
cd /path/to/your/project
yarn link treats
```

We also require all your changes to contain unit tests, so we won't accidentally break your codes on future changes.

## License
By contributing to Treats, you agree that your contributions will be licensed under its Apache 2.0 license.
