import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../util';
import {SpwItem, StrandExpression} from '@constructs/ast';

describe('Phrase Expressions',
         () => {
             it('is a sequence of nodes separated by spaces',
                async (done) => {
                    let all: SpwItem[]            = [];
                    let last: SpwItem | undefined = undefined;

                    const runtime =
                              await startRuntimeWithSrc(`
                                boon < boon > { boon } boon => two 
                                    => three
                              `);
                    last          = getLastRegisteredNode(runtime);
                    all           = getAllRegisteredNodes(runtime);

                    expect(last?.kind).toEqual(StrandExpression.kind);
                    expect(last?.key).toEqual('boon <boon> {boon} boon=>two=>three');
                    expect(all.length).toEqual(18);
                    done()
                });
         })