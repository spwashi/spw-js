import {selectAllNodes, selectLastAcknowledgedNode} from '../../../../_util/runtime/selectors';
import {PhraseNode} from '@constructs/ast';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {initRuntime} from '@constructs/ast/_util/runtime/initializers/runtime';

describe('Phrase Nodes',
         () => {
             it('can be parsed',
                done => {
                    (async () => {
                        const runtime                        = await initRuntime(`test test test`);
                        const last: SpwConstruct | undefined = selectLastAcknowledgedNode(runtime);
                        const all: SpwConstruct[]            = selectAllNodes(runtime);
                        expect(last?.kind).toEqual(PhraseNode.kind);
                        expect(all.length).toEqual(4);
                        expect(last?.key).toEqual('test test test');

                        done();

                    })()
                });
         })