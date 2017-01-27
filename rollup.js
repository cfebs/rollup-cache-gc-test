var rollup = require('rollup')
var babel = require('rollup-plugin-babel');

//const cache = {};

function build() {
    return new Promise((resolve, reject) => {
        let start = new Date;
        rollup.rollup({
            entry: 'src/main.js',
            plugins: [
                babel({
                    "presets": [ [ "es2015", { "modules": false } ] ],
                    "plugins": [ "external-helpers" ],
                    exclude: 'node_modules/**'
                })
            ],
            //cache: cache,
        })
        .then((bundle) => {
            cache = bundle;
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

let numBuilds = 5000;
let heappath = `/tmp/rolluptester-numbuilds-${numBuilds}-${Date.now()}.heapsnapshot`;
let chain = Promise.resolve();

while (--numBuilds) {
    chain = chain.then(() => {
        return build()
    });
}

chain.then(() => {
    console.log('Done!');
    let heapdump = require('heapdump');
    console.log(heappath);
    //heapdump.writeSnapshot(heappath);
});
