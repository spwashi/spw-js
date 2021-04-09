import {Runtime} from '@constructs/runtime/runtime';
import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from './util';

describe('AnchorNodes',
         () => {
             it('Can start with an character of the alphabet and consist of alphanumeric characters, underscores, and dashes',
                async () => {
                    const asyncTest = async () => {
                        try {

                            const runtime = await startRuntimeWithSrc(`test`);
                            const all     = getAllRegisteredNodes(runtime);
                            expect(all.length).toEqual(1);
                        } catch (e) {
                            throw new Error('Parsing Error')
                        }
                    };
                    return expect(asyncTest()).resolves
                });

             it('Cannot begin with a number',
                async () => {
                    const asyncTest = async () => {
                        try {

                            const runtime = await startRuntimeWithSrc(`890`);
                            const all     = getAllRegisteredNodes(runtime);
                            expect(all.length).toEqual(0);
                        } catch (e) {
                            throw new Error('Parsing Error')
                        }
                    };
                    return expect(asyncTest())
                        .rejects
                        .toThrowError('Parsing Error')
                })

             it('Must start with an alphabetic character and must end with an alphanumeric character',
                async () => {
                    const asyncTest =
                            async (src: string, check: (runtime: Runtime) => void) => {
                                try {
                                    const runtime = await startRuntimeWithSrc(src);
                                    check(runtime);
                                } catch (e) {
                                    throw new Error('Parsing Error')
                                }
                            };
                    const len     =
                              (l: number) => (runtime: Runtime) => {
                                  const all  = getAllRegisteredNodes(runtime);
                                  const last = getLastRegisteredNode(runtime);
                                  expect(last?.kind).toEqual('anchor')
                                  expect(all.length).toEqual(l);
                              }
                    try {
                        await expect(asyncTest(`test`, len(1))).resolves;
                        await expect(asyncTest(`test`, len(1))).resolves;
                        await expect(asyncTest(`2test`, len(0))).rejects.toThrowError('Parsing Error').catch(e => e)
                        await expect(asyncTest(`test-`, len(0))).rejects.toThrowError('Parsing Error').catch(e => e)
                        await expect(asyncTest(`-test`, len(0))).rejects.toThrowError('Parsing Error').catch(e => e)
                        await expect(asyncTest(`_test`, len(0))).rejects.toThrowError('Parsing Error').catch(e => e)
                        await expect(asyncTest(`test_`, len(0))).rejects.toThrowError('Parsing Error').catch(e => e)
                    } catch (e) {
                        console.error(e);
                    }
                });
         })