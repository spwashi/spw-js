import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../../util';
import {StringNode} from '@constructs/ast';
import {SpwItem} from '@constructs/ast/abstract/item';

describe('String Nodes',
         () => {
             it('can be parsed',
                async done => {
                    const runtime                   = await startRuntimeWithSrc(`"this is a string"`);
                    const last: SpwItem | undefined = getLastRegisteredNode(runtime);
                    const all: SpwItem[]            = getAllRegisteredNodes(runtime);
                    if (!StringNode.isStringNode(last)) {
                        throw new Error('Incorrect type')
                    }
                    expect(last.kind).toEqual(StringNode.kind);
                    expect(last.kind).toEqual(StringNode.kind);
                    expect(last.key).toEqual('"this is a string"');
                    expect(all.length).toEqual(1);

                    done();
                });
         })