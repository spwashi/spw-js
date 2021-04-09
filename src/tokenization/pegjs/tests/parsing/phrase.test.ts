import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from './util';
import {PhraseNode, SpwItem} from '@constructs/item';

describe('Phrase Nodes',
         () => {
             it('can be parsed',
                done => {
                    (async () => {
                        const runtime                   = await startRuntimeWithSrc(`test test test`);
                        const last: SpwItem | undefined = getLastRegisteredNode(runtime);
                        const all: SpwItem[]            = getAllRegisteredNodes(runtime);
                        expect(last?.kind).toEqual(PhraseNode.kind);
                        expect(all.length).toEqual(4);

                        done();

                    })()
                });
         })