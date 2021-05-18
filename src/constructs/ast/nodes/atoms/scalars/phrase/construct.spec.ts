import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../../../../_util/tests/util';
import {PhraseNode} from '@constructs/ast';
import {SpwItem} from '@constructs/ast/_abstract/item';

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
                        expect(last?.key).toEqual('test test test');

                        done();

                    })()
                });
         })