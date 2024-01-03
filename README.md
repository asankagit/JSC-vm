# JSC-vm
JSC.js for Nodejs

build from source `npx webpack --config webpack.config.js`

usage 
```
const vm = require('@asanka-npm/jsc-vm').default

vm({
    params: {code: `
    const date = new Date();
    date;
    `},
    callback: async (args) => console.log(args)
});
```

Example

`node examples/demo.js``

TODO

* provide Reactjs support