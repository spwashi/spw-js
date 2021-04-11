import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../util';
import {SpwItem} from '@constructs/ast';
import {StrandExpression} from '@constructs/ast/expressions/impl/strand';
import * as util from 'util';

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
                            done();
                        } catch (e) {
                            console.log(util.inspect(e, {depth: null, colors: true}))
                            throw new Error('Parsing Error')
                        }
                    })()
                });
         })