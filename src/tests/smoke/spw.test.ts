// @ts-ignore
import dedent from 'dedent';
import {isSpwNode, SpwNode} from '../../ast/node/spwNode';
import {getConceptId} from '../../runtime/getConceptId';
import {SpwPhraseNode} from '../../ast/node/nodeTypes/phraseNode';
import {SpwDomainNode} from '../../ast/node/nodeTypes/domainNode';
import {SpwStrandNode} from '../../ast/node/nodeTypes/strandNode';
import {SpwAnchorNode} from '../../ast/node/nodeTypes/anchorNode';
import {SpwChannelNode} from '../../ast/node/nodeTypes/channelNode';
import {spwParser} from '../../parser';
import {Runtime, SpwDocument} from '../../index';
import {Parser} from '../../runtime/runtime';
import {SpwNodeNode} from '../../ast/node/nodeTypes/nodeNode';
import {getTestInput1} from './getTestInput1';

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
const loadConcept       = async ({domain, label, body}: Concept, runtime: Runtime) => {
    const moduleID = getConceptId(domain, label);
    const document = new SpwDocument(moduleID, body);
    await runtime.registerDocument(document);
    return await runtime.loadDocument(moduleID)
};


const testConcept1 = getTestInput1()
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
                     sorted.anchor.all.push(<SpwAnchorNode>node);
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