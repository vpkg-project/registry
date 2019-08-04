# VPKG Packages
The official package listing/registry repository for [vpkg](https://github.com/v-pkg/vpkg), an alternative package manager for V.

## Adding packages to the list
To add packages, simply fork this repository, edit [registry.json](registry.json), and create a pull request.

### registry.json
`registry.json` is a JSON file containing an array of objects. 

### Requirements
In order for your pull request to have more chances of getting accepted into the registry, your package must be compliant with the set of rules listed below:

- Package must have a package manifest file. (either `.vpkg.json`, `.vpkg.json`, or `v.mod`).
- Package must run correctly on the latest version of V.

### Renaming package
Renaming a package has the same process of submitting a package to the registry. However, the new name must not be in conflict with other packages as well.

We suggest to finalize the new name of the package before submitting to the registry to avoid unnecessary edits.