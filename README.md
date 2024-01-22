# node-gitinfo

Node module that creates a `git.properties` file with information about the current commit. A modernized fork of Raúl Cruz's [node-git-info](https://github.com/rcruzper/node-git-info), which itself is based on [maven git commit id plugin](https://github.com/ktoso/maven-git-commit-id-plugin) for Java.

## Usage

Install `node-gitinfo` globally using npm:

```sh
npm install -g node-gitinfo
```

To generate the `git.properties` file, run:

```sh
node-gitinfo [options]
```

Options:

- `-d, --directory <path>`: Specify the directory where the `git.properties` file will be saved. The directory must already exist.
- If the directory option is not provided, the `git.properties` file will be saved in the current working directory of the Node.js process.

### Example Output

The `git.properties` file will contain information similar to the following:

```ini
git.commit.id.abbrev=42954d1
git.commit.user.email=user@email.com
git.commit.message.full=first commit
git.commit.id=42954d1fe6285fea65ba81ea39d71d5b75f9ade0
git.commit.message.short=first commit
git.commit.user.name=User Name
git.branch=master
git.commit.time=2016-11-20T11:48:42.000Z
```
