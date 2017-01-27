Get rollup to fail on subsequent rebuilds w/ minimal packages used.

```
npm i
node ./rollup.js
```

Few env var options

```
NUM_BUILDS=50 USE_ROLLUP_CACHE=1 HEAPDUMP=1 node ./rollup.js
```
