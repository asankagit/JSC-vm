const { transform } = require('@babel/core');
const { parse } = require('@babel/parser');
const jscmodule = require('./jsc/jsc');
const { customParse: plugin } = require('./babel-token-plugin');

//Example usage
const vm = require('./dist/vm.generated').default

vm({
    params: {code: `
    const x = sin(30);
    new Date();
    `},
    callback: async (x) => console.log("callbacktrigger",x)
});

const vm_script = ({ params, callback}) => {
    const {code} = params
    try {
        const ast = parse(code);
    } catch (error) {
        console.error('Parsing error:', error.message);
    }
    
    try {
        const transformedCode = transform(code, {
            plugins: [plugin],
        }).code;
    
        const wasmloader = async (untrustedCode) => {
            const promise = await new Promise((resolve, reject) => {
                try {
                    jscmodule['onRuntimeInitialized'] = async () => {
                        const result = ASM_JS.cwrap('jsc_eval', "string", ['string'])(untrustedCode)
                        resolve(result)
                    }
                } catch (jscError) {
                    reject(jscError)
                }
            });
            return promise;
        }
    
        wasmloader(transformedCode).then(msg => {
            callback(msg)
        }).catch(e => console.log(e))
        console.log(transformedCode);
    } catch (error) {
        console.error(error)
    }
    
}

module.exports.default = vm_script
