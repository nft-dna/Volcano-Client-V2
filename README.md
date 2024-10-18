# Volcano-Client-V2

## Project setup
```
npm ci
```
or
```
npm install --legacy-peer-deps
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Runs Storybook for component development
```
npm run storybook
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint --fix
```


#### tips
```
Works with node 18 and prior versions
```
on linux cmd run
export NODE_OPTIONS=--openssl-legacy-provider
```
on windows cmd run
set NODE_OPTIONS=--openssl-legacy-provider
```
or simply
NODE_OPTIONS=--openssl-legacy-provider npm run serve
```