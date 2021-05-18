import {Runtime} from '@constructs/runtime/runtime';
import {SpwConstruct} from '@constructs/ast/_abstract/construct';
import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '@constructs/ast/_util/tests/util';

describe('Domain',
         () => {
             it('can have a Labeled Objective Delimiter',
                async done => {
                    const runtime: Runtime    = await startRuntimeWithSrc(`{_boon test }`);
                    const all: SpwConstruct[] = getAllRegisteredNodes(runtime);
                    expect(getLastRegisteredNode(runtime)?.key).toEqual('{_boon test}');
                    expect(all.length).toEqual(5);
                    done();
                });

             it('can have a Labeled Subjective Delimiter',
                async done => {
                    const runtime: Runtime    = await startRuntimeWithSrc(`{ test }_boon`);
                    const all: SpwConstruct[] = getAllRegisteredNodes(runtime);
                    expect(getLastRegisteredNode(runtime)?.key).toEqual('{test}_boon');
                    expect(all.length).toEqual(5);
                    done();
                });

             it('can have a Labeled Objective Delimiter',
                async done => {
                    const runtime: Runtime    = await startRuntimeWithSrc(`{_boon ~ test }`);
                    const all: SpwConstruct[] = getAllRegisteredNodes(runtime);
                    expect(getLastRegisteredNode(runtime)?.key).toEqual('{_boon ~; test}');
                    expect(all.length).toEqual(6);
                    done();
                });
         })