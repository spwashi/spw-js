import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../../../../_util/tests/util';
import {StringNode} from '@constructs/ast';
import {SpwConstruct} from '@constructs/ast/_abstract/construct';

describe('String Nodes',
         () => {
             it('can be parsed',
                async done => {
                    const runtime                        = await startRuntimeWithSrc(`"this is a string"`);
                    const last: SpwConstruct | undefined = getLastRegisteredNode(runtime);
                    const all: SpwConstruct[]            = getAllRegisteredNodes(runtime);
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