import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../../util';
import {PhraseNode, SpwItem, StringNode} from '@constructs/ast';

describe('String Nodes',
         () => {
             it('can be parsed',
                done => {
                    (async () => {
                        const runtime                   = await startRuntimeWithSrc(`"this is a string"`);
                        const last: SpwItem | undefined = getLastRegisteredNode(runtime);
                        const all: SpwItem[]            = getAllRegisteredNodes(runtime);
                        expect(last?.kind).toEqual(StringNode.kind);
                        expect(last?.key).toEqual("this is a string");
                        expect(all.length).toEqual(1);

                        done();

                    })()
                });
         })