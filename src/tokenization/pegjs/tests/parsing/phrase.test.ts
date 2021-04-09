import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from './util';
import {PhraseNode} from '@constructs/item';
import {SpwItem} from '@constructs/item';

describe('Phrase Nodes',
         () => {
             it('can be parsed',
                done => {
                    (async () => {
                        let all: SpwItem[]            = [];
                        let last: SpwItem | undefined = undefined;
                        try {
                            const runtime = await startRuntimeWithSrc(`test test test`);
                            last          = getLastRegisteredNode(runtime);
                            all           = getAllRegisteredNodes(runtime);

                            expect(last?.kind).toEqual(PhraseNode.kind);
                            expect(all.length).toEqual(4);

                            debugger;
                            done();
                        } catch (e) {
                            debugger;
                            throw new Error('Parsing Error')
                        }
                    })()
                });
         })