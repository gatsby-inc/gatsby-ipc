# gatsby-ipc

Run gatsby build and expose events from IPC

## Install

```sh
$ yarn add gatsby-ipc
```

Add a script

```json
{
 "scripts": {
    "gatsby-ipc": "gatsby-ipc"
 }
}
```

## How to use

### Build
Run yarn build it will spawn the gatsby build command with ipc

```sh
gatsby-ipc build
```


### Develop
Run yarn preview it will spawn the gatsby develop command with ipc

```sh
gatsby-ipc develop
```
