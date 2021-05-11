import {Runtime} from '@constructs/runtime/runtime';
import {SpwItem} from '@constructs/ast/_abstract/item';
import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '@constructs/ast/_util/tests/util';

describe('Domain',
         () => {
             it('can have a Labeled Objective Delimiter',
                async done => {
                    const runtime: Runtime = await startRuntimeWithSrc(`{_boon test }`);
                    const all: SpwItem[]   = getAllRegisteredNodes(runtime);
                    expect(getLastRegisteredNode(runtime)?.key).toEqual('{_boon test}');
                    expect(all.length).toEqual(5);
                    done();
                });
             it('can have a Labeled Subjective Delimiter',
                async done => {
                    const runtime: Runtime = await startRuntimeWithSrc(`{ test }_boon`);
                    const all: SpwItem[]   = getAllRegisteredNodes(runtime);
                    expect(getLastRegisteredNode(runtime)?.key).toEqual('{test}_boon');
                    expect(all.length).toEqual(5);
                    done();
                });

             it('can have a Labeled Objective Delimiter',
                async done => {
                    const runtime: Runtime = await startRuntimeWithSrc(`{_boon ~ test }`);
                    const all: SpwItem[]   = getAllRegisteredNodes(runtime);
                    expect(getLastRegisteredNode(runtime)?.key).toEqual('{_boon ~; test}');
                    expect(all.length).toEqual(6);
                    done();
                });
         })