import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../../util';
import {DomainContainer} from '@constructs/ast';
import {Runtime} from '@constructs/runtime/runtime';
import {SpwItem} from '@constructs/ast/abstract/item';

describe('Domain Node Parsing',
         () => {
             it('can parse: Standard Domains',
                async done => {
                    {
                        const runtime: Runtime = await startRuntimeWithSrc(`{one => two => three}`);
                        const all: SpwItem[]   = getAllRegisteredNodes(runtime);
                        expect(all.length).toEqual(7);
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
                        expect(last?.kind).toEqual(DomainContainer.kind)
                        expect(all.length).toEqual(6);
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
                        expect(last?.kind).toEqual(DomainContainer.kind)
                        expect(all.length).toEqual(34);
                    }

                    {
                        const runtime: Runtime          = await startRuntimeWithSrc(`{_< boon > ~one => two => three}`);
                        const last: SpwItem | undefined = getLastRegisteredNode(runtime);
                        const all: SpwItem[]            = getAllRegisteredNodes(runtime);
                        expect(last?.kind).toEqual(DomainContainer.kind);
                        expect(last?.key).toEqual('{_<boon> ~ one=>two=>three}');
                        expect(all.length).toEqual(13);
                        const indexedDelimiter = runtime.locateNode('{_<boon>')[0]
                        const locatedDelimiter = runtime.locateNode((last as SpwItem)?.raw?.open)[0];
                        expect(indexedDelimiter).toEqual(locatedDelimiter);
                    }
                    done();
                });
         })