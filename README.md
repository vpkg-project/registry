# vpkg Registry

The official package listing/registry repository for [vpkg](https://github.com/vpkg-project/vpkg), an alternative package manager for V.

## Adding packages to the list

To add packages, simply fork this repository, edit [registry.json](registry.json), and create a pull request.

### registry.json

`registry.json` is a JSON file containing an array of objects. Each package object should have the following fields.

- `name` - Name of the package
- `url` - URL to be used to retrieve the package.
- `method` - The method of the download of downloading the package. (vpkg supports `git`, `hg`, and `svn`)
- `vpm` - Name of the package submitted to the VPM registry. (If you haven't submitted it yet, you can just take the Github username and the name of your module and put a dot in between as your VPM package name.)

### Requirements

For your pull request to have more chances of getting accepted into the registry, your package must be compliant with the set of rules listed below:

- It must be tested on the latest version of V.

Including package manifest files (like `v.mod` and `vpkg.json`) into the modules/package is optional but is highly recommended if your packages include additional dependencies as well as additional metadata like a version number for better tracking/updating of packages.

### Updating package information

There are some cases wherein a package gets updated (e.g renaming a package name) for various reasons. And updating it has the same process as submitting a package to the registry. However, the new information must not conflict with other packages so be sure to verify it before submitting it.

We highly encourage to finalize everything before submitting it to the registry to avoid unnecessary edits.
