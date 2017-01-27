var rollup = require('rollup')
var babel = require('rollup-plugin-babel');

var cache;
let i = 0;
let useCache = process.env.USE_ROLLUP_CACHE;

function build() {
    return new Promise((resolve, reject) => {
        let start = new Date;
        console.log('#'+(++i));

        rollup.rollup({
            entry: 'src/main.js',
            plugins: [
                babel({
                    "presets": [ [ "es2015", { "modules": false } ] ],
                    "plugins": [ "external-helpers" ],
                    exclude: 'node_modules/**'
                })
            ],
            cache: useCache ? cache : null,
        })
        .then((bundle) => {
            if (useCache) {
                cache = bundle;
            }

            bundle.write({
                format: 'iife',
                dest: './bundle.js'
            });
            console.log('End', (new Date) - start);
            resolve(true);
        })
        .catch((err) => {
            console.error(err);
            console.log('End', (new Date) - start);
            resolve(true);
        });
    });
}

let numBuilds = parseInt(process.env.NUM_BUILDS || 5000, 10);
let heappath = `/tmp/rolluptester-numbuilds-${numBuilds}-${Date.now()}.heapsnapshot`;
let chain = Promise.resolve();

while (--numBuilds) {
    chain = chain.then(() => {
        return build()
    });
}

chain.then(() => {
    console.log('Done!');
    if (process.env.HEAPDUMP) {
        let heapdump = require('heapdump');
        console.log(heappath);
        heapdump.writeSnapshot(heappath);
    }
});
