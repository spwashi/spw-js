import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../../util';
import {DomainNode, SpwItem} from '@constructs/ast';
import {Runtime} from '@constructs/runtime/runtime';
import {SpwNode} from '@constructs/ast/nodes/abstract/node';
import * as util from 'util';

describe('Domain Node Parsing',
         () => {
             it('can parse: Standard Domains',
                done => {
                    (async () => {
                        {
                            const runtime: Runtime = await startRuntimeWithSrc(`{one => two => three}`);
                            const all: SpwItem[]   = getAllRegisteredNodes(runtime);
                            expect(all.length).toEqual(9);
                        }
                        {
                            const runtime: Runtime          = await startRuntimeWithSrc(`
                                {
                                    one 
                                    two 
                                    three
                                }
                            `);
                            const last: SpwItem | undefined = getLastRegisteredNode(runtime);
                            const all: SpwItem[]            = getAllRegisteredNodes(runtime);
                            expect(last?.kind).toEqual(DomainNode.kind)
                            expect(all.length).toEqual(7);
                        }
                        {
                            const runtime: Runtime          = await startRuntimeWithSrc(`
                                {_todo
                                         &  => checkout "origin/main"
                                         &  => run yarn install
                                         &  => run yarn build
                                            => check "./dist" for the output of < the build step >
                                    }
                            `);
                            const last: SpwItem | undefined = getLastRegisteredNode(runtime);
                            const all: SpwItem[]            = getAllRegisteredNodes(runtime);
                            expect(last?.kind).toEqual(DomainNode.kind)
                            expect(all.length).toEqual(41);
                        }

                        {
                            const runtime: Runtime          = await startRuntimeWithSrc(`{_< boon > ~one => two => three}`);
                            const last: SpwItem | undefined = getLastRegisteredNode(runtime);
                            const all: SpwItem[]            = getAllRegisteredNodes(runtime);
                            expect(last?.kind).toEqual(DomainNode.kind);
                            expect(last?.key).toEqual('{_<boon> ~ one=>two=>three}');
                            expect(all.length).toEqual(16);
                            const indexedDelimiter = runtime.locateNode('{_<boon>')[0]
                            const locatedDelimiter = runtime.locateNode((last as SpwItem)?.raw.open)[0];
                            expect(indexedDelimiter).toBeInstanceOf(SpwNode);
                            expect(indexedDelimiter).toEqual(locatedDelimiter);
                        }
                        done();
                    })().catch(e => {
                        console.log(util.inspect(e, {depth: null, colors: true}))
                    })
                });
         })