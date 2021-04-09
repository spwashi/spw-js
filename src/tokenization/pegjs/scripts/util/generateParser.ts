import {init} from '../../src/init';
import {
    AnchorNode,
    ChannelNode,
    ConceptualNode,
    DomainNode,
    EssentialNode,
    EvaluationNode,
    GroupNode,
    InvocationNode,
    PerformanceNode,
    PerspectiveNode,
    PhraseNode,
    StringNode,
    WordNode,
} from '../../../../constructs';
import {StrandExpression} from '../../../../constructs/item/impl/expressions/impl/strand';
import {generateParser} from '@spwashi/language/parsers/run';


// language=JavaScript
const head =
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
                      case '${ConceptualNode.kind}':

                      case '${StrandExpression.kind}':

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

const grammarInput = init();

export async function initSpw(): Promise<string> {
    // const head = fs.readFileSync(path.join(__dirname, 'boon.js'), 'utf-8');
    // console.log(head);
    const {parser} = await generateParser(head, grammarInput);
    return parser;
}

export async function generatePegJsFile(): Promise<string> {
    const {grammar} = await generateParser(head, grammarInput);
    return grammar;
}
