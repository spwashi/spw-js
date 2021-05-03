import {
    AnchorNode,
    ChannelAtom,
    Concept,
    Domain,
    Essence,
    EvaluationAtom,
    InvocationAtom,
    Group,
    PerformanceAtom,
    PerspectiveAtom,
    PhraseExpression,
    PhraseNode,
    StrandExpression,
    StringNode,
} from '../../../constructs/ast';
import {PerspectiveExpression} from '@constructs/ast/expressions/impl/perspective_expression';

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
                             case '${ChannelAtom.kind}':
                             case '${EvaluationAtom.kind}':
                             case '${InvocationAtom.kind}':
                             case '${PerformanceAtom.kind}':
                             case '${PerspectiveAtom.kind}':

                             case '${StringNode.kind}':
                             case '${AnchorNode.kind}':
                             case '${PhraseNode.kind}':

                             case '${Domain.kind}':
                             case '${Group.kind}':
                             case '${Essence.kind}':
                             case '${Concept.kind}':

                             case '${PerspectiveExpression.kind}':
                             case '${StrandExpression.kind}':
                             case '${PhraseExpression.kind}':

                             case 'number':
                             case 'lens':
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