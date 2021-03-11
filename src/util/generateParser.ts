import {init} from '../tokenization';

const {generateParser} = require('@spwashi/language/language/parser-generation/run');


// language=JavaScript
const head =
          `
              const _cache = new Map();

              function normalize(node) {
                  return {
                      key: text().trim(),
                      ...Object
                          .fromEntries(
                              Object
                                  .entries(node)
                                  .filter(([k, v]) => v !== null)
                          ),
                      source:   text(),
                      location: location(),
                  };
              }

              function spwNode(node) {
                  if (!node.kind) throw new Error('No node kind specified')
                  var cacheKey = JSON.stringify(location());
                  if (_cache.has(cacheKey)) return _cache.get(cacheKey);

                  const out = normalize(node);
                  _cache.set(cacheKey, out);
                  switch (out.kind) {
                      case 'node':
                      case 'channel':
                      case 'performance':
                      case 'perspective':
                      case 'evaluation':
                      case 'string':
                      case 'anchor':
                      case 'domain':
                      case 'strand':
                      case 'space':
                      case 'phrase':
                      case 'transport':
                      case 'essence':
                      case 'concept':
                      case 'selection':
                      case 'analog':
                      case 'analog-tail':
                      case 'analogical-operator':
                      case 'complex_node':
                      case 'invocation':
                      case 'strand-tail':
                          return out;
                      default:
                          console.error('No handler for ' + out.kind);
                          out ? (out.kind = out.kind || 'unknown') : null;
                          return out;
                  }
              }
          `

const grammarInput = init();

export async function initSpw() {
    const {parser} = await generateParser(head, grammarInput);
    return parser;
}

export async function generatePegJsFile() {
    const {grammar} = await generateParser(head, grammarInput);
    return grammar;
}
