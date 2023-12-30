const { parse } = require('@babel/parser');

const customParse = ({ types: t }) => {
  return {
    visitor: {
      CallExpression(path) {
        const node = path.node;

        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'sin' &&
          node.arguments.length === 1
        ) {
          const arg = node.arguments[0];

          // Custom tokenization logic for the argument
          const token = t.identifier('SIN_TOKEN');

          path.replaceWith(
            // t.callExpression(token, [arg])
            t.binaryExpression('+', t.callExpression(t.identifier('Math.sin'), [arg]), t.callExpression(t.identifier('Math.cos'), [arg]))
          );
        }
      },
    },
  };
}

module.exports = { customParse };