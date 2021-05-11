import {
    getAllRegisteredNodes,
    getLastRegisteredNode,
    startRuntimeWithSrc,
} from '../../../_util/tests/util';
import {StrandExpression} from '@constructs/ast/expressions/relational/strand/expression';
import {SpwItem} from '@constructs/ast/_abstract/item';
import * as util from 'util'

describe('Strand Expressions',
         () => {
             it('is a [node] followed by any number of valid strand tails',
                done => {
                    (async () => {
                        let all: SpwItem[]            = [];
                        let last: SpwItem | undefined = undefined;
                        try {
                            const runtime = await startRuntimeWithSrc(`test test test => test => test`);
                            last          = getLastRegisteredNode(runtime);
                            all           = getAllRegisteredNodes(runtime);
                            expect(last?.kind).toEqual(StrandExpression.kind);
                            expect(all.length).toEqual(9);
                            expect(last?.key).toEqual('test test test=>test=>test');
                            done();
                        } catch (e) {
                            console.log(util.inspect(e, {depth: null, colors: true}))
                            throw new Error('Parsing Error')
                        }
                    })()
                });
         })