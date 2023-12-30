# JSC-vm
JSC.js for Nodejs

run `npx webpack --config webpack.config.js`

usage 
`const vm = require('jsc-vm').default

vm({
    params: {code: `
    const x = sin(30);
    new Date();
    `},
    callback: async (x) => console.log("callbacktrigger",x)
});`