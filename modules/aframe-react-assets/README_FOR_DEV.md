### Develop

```shell
yarn install
yarn wattch
```

### Create this boilerplate:
```shell
# For react
yarn add react prop-types

# For babel transform
yarn add --dev babel-cli babel-preset-react-app babel-plugin-transform-decorators-legacy  babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread

# TODO: For test
```

Setup `package.json`:

Entry point is `dist/index.js`
```json
{
    "main": "dist/index.js",
}
```
    
Scripts
```
{
    scripts: { ... see package.json for more detail ... }
}
```
