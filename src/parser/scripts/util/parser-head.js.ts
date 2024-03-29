/* eslint-disable no-var,@typescript-eslint/ban-ts-comment */

import { Construct } from '../../../constructs/ast/_abstract/construct';

Construct;

// language=JavaScript
export default `
  ${spwHead.toString()};
  var head = spwHead();
  var toConstruct = head.toConstruct;
  var constructs = head.constructs;
`;

/* builtins */
const text = () => null;
const location = () => null;

/* core parser logic */
function spwHead() {
  var _cache = new Map();

  /**
   * add the usual things to a node, remove missteps
   * @param node
   */
  function normalize(
    // @ts-ignore
    node,
  ) {
    return Object.assign(
      {
        src: text(),
        srcloc: location(),
      },
      Object.fromEntries(
        Object.entries(node).filter((e) => {
          var k = e[0];
          var v = e[1];
          return k === 'key' ? true : v !== undefined;
        }),
      ),
    );
  }

  /**
   * Convert a node to a {@see Construct } Construct initializer
   * @param node
   */
  function toConstruct(
    // @ts-ignore
    node,
  ) {
    if (typeof location === 'undefined') return;
    if (!node.kind) throw new Error('No node kind specified');
    var cacheKey = JSON.stringify(location());
    if (_cache.has(cacheKey)) return _cache.get(cacheKey);

    var out = normalize(node);
    _cache.set(cacheKey, out);
    return out;
  }

  /** Actions **/
  var constructs = {
    space: function () {
      return toConstruct({ kind: 'space' });
    },
  };

  return {
    toConstruct,
    constructs,
  };
}
