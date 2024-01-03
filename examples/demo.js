const vm = require('../dist/vm.generated').default

vm({
    params: {code: `
    const date = new Date();
    date
    `},
    callback: async (x) => console.log("callbacktrigger",x)
});