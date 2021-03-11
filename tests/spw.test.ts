// @ts-ignore
import dedent from 'dedent';
import {isSpwNode, SpwNode} from '../src/ast/node/spwNode';
import {getConceptId} from '../src/runtime/getConceptId';
import {SpwPhraseNode} from '../src/ast/node/nodeTypes/phraseNode';
import {SpwDomainNode} from '../src/ast/node/nodeTypes/domainNode';
import {SpwStrandNode} from '../src/ast/node/nodeTypes/strandNode';
import {SpwAnchorNode} from '../src/ast/node/nodeTypes/anchorNode';
import {SpwChannelNode} from '../src/ast/node/nodeTypes/channelNode';
import {spwParser} from '../src/parser';
import {Runtime, SpwDocument} from '../src';
import {Parser} from '../src/runtime/runtime';
import {SpwNodeNode} from '../src/ast/node/nodeTypes/nodeNode';

function fromEntries(iterable: Iterable<any>) {
    return [...iterable].reduce((obj, [key, val]) => {
        obj[key] = val
        return obj
    }, {})
}


type Concept = {
    domain: string,
    label: string,
    body: string
};
const initializeRuntime = () => { return new Runtime(spwParser as unknown as Parser) }

const loadConcept =
          async ({domain, label, body}: Concept, runtime: Runtime) => {
              const moduleID = getConceptId(domain, label);
              const document = new SpwDocument(moduleID, body);

              await runtime.module__register(document);

              return await runtime.module__load(moduleID)
          };


const testConcept1 =
          dedent`
{
    {_anchors-and-phrases
        &
        &_
        &_placeholder
       
        --
        
        anchor
        anchor-with-dashes
        
        --
        
        phrases are composed of multiple words
        phrases are composed of multiple anchors[ sometimes having an essence ]
        
        --
        
        {_examples
            & => &
            & => &_
            & => cat
            & => boiled eggs are hard
            & => &_eggs
        }
    }
    {_essence
        anchor[
            concept
            
            --
            
            #_status
            
            --
            
            objective => subjective
            objective => intermediate => subjective
        ]
    }
    {_description
        anchor.{
            test
        }
    }
    {_channels
        #
        #_channel
        #_channel_2 => strand
    }
}
`

const testConcept2 = `this is a phrase`;
const testConcept  = testConcept2;


// Testing standard behaviors
test('can generate parser',
     async function () {
         const runtime     = initializeRuntime();
         const conceptList =
                   await loadConcept(
                       {
                           domain: 'testing',
                           label:  'concept_1',
                           body:   testConcept
                           ,
                       },
                       runtime,
                   );

         if (!(isSpwNode(conceptList))) return;


         const sorted: {
             domain: {
                 all: SpwDomainNode[],
                 objective: { [k: string]: SpwNode[] },
                 subjective: { [k: string]: SpwNode[] },

                 [k: string]: any
             },
             channel: { all: SpwChannelNode[], [k: string]: any },
             anchor: { all: SpwAnchorNode[], keyed: { [key: string]: SpwNode[] }, [k: string]: any },
             strand: { all: SpwStrandNode[], [k: string]: any },
             node: { all: SpwNodeNode[], [k: string]: any },
             phrase: { all: SpwPhraseNode[], [k: string]: any },
         }                    =
                   {
                       domain:  {all: [], objective: {}, subjective: {}},
                       anchor:  {all: [], keyed: {}},
                       channel: {all: []},
                       node:    {all: []},
                       strand:  {all: []},
                       phrase:  {all: []},
                   }
         const all: SpwNode[] = Array.from(runtime.registers.get(Runtime.symbols.all)?.items ?? []).map(_ => (_.item as unknown as SpwNode));

         function _sortDomainIndex(node: SpwDomainNode, index: 'objective' | 'subjective') {
             const nodeElement = node[index];
             if (!nodeElement) { return; }

             const dict = sorted.domain[index] = sorted.domain[index];
             const arr  = dict[nodeElement.key] = dict[nodeElement.key] ?? [];
             arr.push(nodeElement);
         }

         all.forEach(
             (node: SpwNode) => {
                 if (node.kind === 'node') {
                     sorted.node.all.push(node as SpwNodeNode);
                 }
                 if (node.kind === 'phrase') {
                     sorted.phrase.all.push(node as SpwPhraseNode);
                 }

                 if (node.kind === 'domain') {
                     const domain = node as SpwDomainNode;
                     sorted.domain.all.push(domain);
                     _sortDomainIndex(domain, 'objective');
                     _sortDomainIndex(domain, 'subjective');
                 }

                 if (node.kind === 'anchor') {
                     sorted.anchor.all.push(node);
                     const arr = sorted.anchor.keyed[node.key] = sorted.anchor.keyed[node.key] ?? [];
                     arr.push(node);
                 }

                 if (node.kind === 'strand') {
                     sorted.strand.all.push(node as SpwStrandNode);
                 }
             },
         )
         // console.log(all, sorted);

         const objectiveAnchorDomains = fromEntries(Object
                                                        .entries(sorted.domain.objective)
                                                        .map(([key, domain]: [string, SpwNode[]]) => [key,
                                                                                                      domain.map(node => node.getProp('owner'))]));

         const strands     = sorted.strand.all;
         const strandNodes = strands.map(strand => strand.getProp('nodes'))
         const anchors     = sorted.anchor.keyed;
         const nodes       = sorted.node.all;
         const phrases     = sorted.phrase.all;

         nodes;
         phrases;
         anchors;
         strands;
         strandNodes;
         debugger;
     });