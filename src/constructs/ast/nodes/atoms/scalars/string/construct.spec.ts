import {selectAllNodes, selectLastAcknowledgedNode} from '../../../../_util/runtime/selectors';
import {StringNode} from '@constructs/ast';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {initRuntime} from '@constructs/ast/_util/runtime/initializers/runtime';

describe('String Nodes',
         () => {
             it('can be parsed',
                async done => {
                    const runtime                        = await initRuntime(`"this is a string"`);
                    const last: SpwConstruct | undefined = selectLastAcknowledgedNode(runtime);
                    const all: SpwConstruct[]            = selectAllNodes(runtime);
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