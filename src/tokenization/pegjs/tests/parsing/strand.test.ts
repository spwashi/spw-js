import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from './util';
import {SpwItem} from '@constructs/item';
import {StrandExpression} from '@constructs/item/impl/expressions/impl/strand';

describe('Strand Nodes',
         () => {
             it('can be parsed',
                done => {
                    (async () => {
                        let all: SpwItem[]            = [];
                        let last: SpwItem | undefined = undefined;
                        try {
                            const runtime = await startRuntimeWithSrc(`test test test => test => test`);
                            last          = getLastRegisteredNode(runtime);
                            all           = getAllRegisteredNodes(runtime);

                            expect(last?.kind).toEqual(StrandExpression.kind);
                            expect(all.length).toEqual(10);
                            // console.log(util.inspect(last, {depth: null, colors: true}))
                            debugger;
                            done();
                        } catch (e) {
                            // console.log(util.inspect(e, {depth: null, colors: true}))
                            debugger;
                            throw new Error('Parsing Error')
                        }
                    })()
                });
         })