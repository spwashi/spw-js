import {Parser, Runtime} from '../../../runtime/runtime';
import {spwParser} from '../../../parser';
import {SpwDocument} from '../../../runtime/spwDocument';
import {RuntimeRegister} from '../../../runtime/register';
import {SpwDomainNode} from '../../../ast/node/nodeTypes/domainNode';
import {SpwStrandNode} from '../../../ast/node/nodeTypes/strandNode';
import {SpwAnchorNode} from '../../../ast/node/nodeTypes/anchorNode';
import {SpwNode} from '../../../ast/node/spwNode';

const initializeRuntime = () => { return new Runtime(spwParser as unknown as Parser) }
const loadConcept       = async (src: string, runtime: Runtime) => {
    let moduleID   = 'test';
    const document = new SpwDocument(moduleID, src);
    await runtime.registerDocument(document);
    return await runtime.loadDocument(moduleID)
};

async function startRuntimeWithSrc(testConcept: string) {
    const runtime = initializeRuntime();
    await loadConcept(testConcept, runtime);
    return runtime;
}
describe(
    'Node Resolution',
    function () {
        it('should return a generator upon request for node location', async function () {
            const runtime =
                      await startRuntimeWithSrc(`
                        {_hello boon, boon, boon => boon, boon
                            => boon,
                
                            boon
                            boon
                
                        boon_}
                      `);
            const all     = runtime.locateNode('boon');
            for await (let i of all) {
                expect(i).toBeInstanceOf(SpwNode)
            }
        });
    },
);

describe(
    'Types',
    function () {
        it('should Parse Strands in Domains correctly', async function () {
            const runtime                        =
                      await startRuntimeWithSrc(`
                        {_context
                            one => two => three               
                        }
                      `);
            const all                            = await runtime.locateNode('context');
            const a_context: SpwNode | undefined = (await all.next()).value;

            expect(a_context).toBeInstanceOf(SpwAnchorNode);
            const d_ = a_context?.owner;
            expect(d_).toBeInstanceOf(SpwDomainNode);
            const children = d_?.nodes;
            console.log(children)
            debugger;
            expect(children?.length).toEqual(1);
        });
    },
);

describe(
    'Registers',
    function () {
        describe('all',
                 function () {
                     it('should Contain multiple items', async function () {
                         const runtime  = await startRuntimeWithSrc(`{_one boon }`);
                         const register = runtime.registers.get(Runtime.symbols.all) as RuntimeRegister;
                         const all      = register.resolve();
                         expect(all).toHaveLength(3);
                         const index0 = register.resolve(0) as SpwDomainNode;
                         expect(index0).toBeInstanceOf(SpwDomainNode);
                         expect(index0).toHaveProperty('scope');
                         const scope = index0.scope;
                         expect(scope.generation).toEqual(0);

                         const one = runtime.locateNode('one');
                         expect((await one.next()).value).toBeInstanceOf(SpwAnchorNode);
                         expect((await one.next()).value).toBeUndefined();
                         const boon = runtime.locateNode('boon');
                         expect((await boon.next()).value).toBeInstanceOf(SpwAnchorNode);
                     });
                     it('should Contain the last item registered, or the bottom most top-level block', async function () {
                         const runtime  = await startRuntimeWithSrc(`
                        {_one 
                            boon 
                        }
                        {_two 
                            boon 
                        }
                    `);
                         const register = runtime.registers.get(Runtime.symbols.all) as RuntimeRegister;
                         expect(register.resolve()).toHaveLength(6);
                     });
                 },
        );
        describe('Last Acknowledged',
                 function () {
                     it('should only contain one item', async function () {
                         const runtime  = await startRuntimeWithSrc(`{_one boon }`);
                         const register = runtime.registers.get(Runtime.symbols.lastAcknowledged) as RuntimeRegister;
                         expect(register.resolve()).toHaveLength(1);
                         const lastAcknowledged = register.resolve(0) as SpwDomainNode;
                         expect(lastAcknowledged).toBeInstanceOf(SpwDomainNode);
                         expect(lastAcknowledged).toHaveProperty('scope');
                         const scope = lastAcknowledged.scope;
                         expect(scope.generation).toEqual(0);
                     });
                     it('should Contain the last item registered, or the bottom most top-level block', async function () {
                         const runtime  = await startRuntimeWithSrc(`
                        {_one 
                            boon 
                        }
                        {_two 
                            boon 
                        }
                    `);
                         const register = runtime.registers.get(Runtime.symbols.lastAcknowledged) as RuntimeRegister;
                         expect(register.resolve()).toHaveLength(1);
                         let lastAcknowledged = register.resolve(0);
                         expect(lastAcknowledged).toBeInstanceOf(SpwDomainNode);
                         expect(lastAcknowledged).toHaveProperty('key', '{_two boon }');
                     });
                     it('should Return a strand if a strand is the last top-level item', async function () {
                         const runtime  = await startRuntimeWithSrc(`
                            boon
                            boon
                            boon 
                                => 
                                boon 
                                =>
                                boon
                        `);
                         const register = runtime.registers.get(Runtime.symbols.lastAcknowledged) as RuntimeRegister;
                         expect(register.resolve()).toHaveLength(1);
                         const lastAcknowledged = register.resolve(0);
                         expect(lastAcknowledged).toBeInstanceOf(SpwStrandNode);
                         expect(lastAcknowledged).toHaveProperty('key', 'boon => boon => boon');
                     });
                 },
        );
    },
)