import {Domain, InvocationOperator} from '@constructs/ast';
import {Runtime} from '@constructs/runtime/runtime';
import {SpwConstruct} from '@constructs/ast/_abstract/construct';
import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '@constructs/ast/_util/tests/util';

describe('Domain:SmokeTest',
         () => {
             it('does what we expect it to',
                async done => {
                    {
                        const runtime: Runtime    = await startRuntimeWithSrc(`{one => two => three}`);
                        const all: SpwConstruct[] = getAllRegisteredNodes(runtime);
                        expect(all.length).toEqual(9);
                    }

                    {
                        const runtime: Runtime               = await startRuntimeWithSrc(`
                            {
                                one 
                                two 
                                three
                            }
                        `);
                        const last: SpwConstruct | undefined = getLastRegisteredNode(runtime);
                        const all: SpwConstruct[]            = getAllRegisteredNodes(runtime);
                        expect(last?.kind).toEqual(Domain.kind)
                        expect(all.length).toEqual(6);
                    }

                    {
                        const runtime: Runtime               = await startRuntimeWithSrc(`
                                {_todo
                                     &  => checkout "origin/main"
                                     &  => run yarn install
                                     &  => run yarn build
                                        => check "./dist" for the output of < the build step >
                                }
                            `);
                        const last: SpwConstruct | undefined = getLastRegisteredNode(runtime);
                        const all: SpwConstruct[]            = getAllRegisteredNodes(runtime);
                        expect(last?.kind).toEqual(Domain.kind)
                        expect(all.length).toEqual(39);
                    }

                    {
                        const runtime: Runtime               = await startRuntimeWithSrc(`{_< boon > ~one => two => three}`);
                        const last: SpwConstruct | undefined = getLastRegisteredNode(runtime);
                        const all: SpwConstruct[]            = getAllRegisteredNodes(runtime);
                        expect(last?.kind).toEqual(Domain.kind);

                        expect(InvocationOperator).not.toEqual('this is here so the docblock below works')
                        /**  note: this is subject to change dependent on the behavior of {@see InvocationOperator} */
                        expect(last?.key).toEqual('{_<boon> ~; one=>two=>three}');
                        expect(all.length).toEqual(14);
                        const indexedDelimiter = runtime.locateNode('{_<boon>')[0]
                        const locatedDelimiter = runtime.locateNode((last as SpwConstruct)?.internal?.open)[0];
                        expect(indexedDelimiter).toEqual(locatedDelimiter);
                    }

                    done();
                });
         })