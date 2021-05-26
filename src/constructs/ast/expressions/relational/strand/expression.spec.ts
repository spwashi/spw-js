import {
    getAllRegisteredNodes,
    getLastRegisteredNode,
    startRuntimeWithSrc,
} from '../../../_util/tests/util';
import {StrandExpression} from '@constructs/ast/expressions/relational/strand/expression';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import * as util from 'util'

describe('Strand Expressions',
         () => {
             it('is a [node] followed by any number of valid strand tails',
                done => {
                    (async () => {
                        let all: SpwConstruct[]            = [];
                        let last: SpwConstruct | undefined = undefined;
                        try {
                            const runtime = await startRuntimeWithSrc(`test test test =>    test    =>    test   `);
                            last          = getLastRegisteredNode(runtime);
                            all           = getAllRegisteredNodes(runtime);
                            expect(last?.kind).toEqual(StrandExpression.kind);
                            expect(all.length).toEqual(11);
                            expect(last?.key).toEqual('test test test=>test=>test');
                            done();
                        } catch (e) {
                            console.log(util.inspect(e, {depth: null, colors: true}))
                            throw new Error('Parsing Error')
                        }
                    })()
                });
         })