import {
    AnchorNode,
    ChannelNode,
    ConceptNode,
    DomainNode,
    EssentialNode,
    EvaluationNode,
    GroupNode,
    InvocationNode,
    PerformanceNode,
    PerspectiveNode,
    PhraseExpression,
    PhraseNode,
    StrandExpression,
    StringNode,
    WordNode,
} from '@constructs/ast';

// language=JavaScript
export const head =
                 `
                     const _cache = new Map();

                     function normalize(node) {
                         return {
                             key: text(),
                             ...Object
                                 .fromEntries(
                                     Object
                                         .entries(node)
                                         .filter(([k, v]) => k === 'key' ? true : v !== undefined)
                                 ),
                             src:      text(),
                             location: location()
                         };
                     }

                     function toSpwItem(node) {
                         if (!node.kind) throw new Error('No node kind specified')
                         var cacheKey = JSON.stringify(location());
                         if (_cache.has(cacheKey)) return _cache.get(cacheKey);

                         const out = normalize(node);
                         _cache.set(cacheKey, out);
                         switch (out.kind) {
                             case '${ChannelNode.kind}':
                             case '${EvaluationNode.kind}':
                             case '${InvocationNode.kind}':
                             case '${PerformanceNode.kind}':
                             case '${PerspectiveNode.kind}':

                             case '${StringNode.kind}':
                             case '${AnchorNode.kind}':
                             case '${WordNode.kind}':
                             case '${PhraseNode.kind}':

                             case '${DomainNode.kind}':
                             case '${GroupNode.kind}':
                             case '${EssentialNode.kind}':
                             case '${ConceptNode.kind}':

                             case '${StrandExpression.kind}':
                             case '${PhraseExpression.kind}':

                             case 'number':
                             case 'strand-tail':
                             case 'node-body':
                             case 'delimiter':
                             case 'space':
                                 return out;
                             default:
                                 console.error('No handler for ' + out.kind);
                                 out ? (out.kind = out.kind || 'unknown') : null;
                                 throw new Error();
                         }
                     }
                 `;