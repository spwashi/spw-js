import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from './util';
import {DomainNode, SpwItem} from '@constructs/item';
import {Runtime} from '@constructs/runtime/runtime';
import {SpwNode} from '@constructs/item/impl/nodes/abstract/node';

describe('Domain Nodes',
         () => {
             it('can be parsed',
                done => {
                    (async () => {
                        const runtime: Runtime          = await startRuntimeWithSrc(`{_< boon > one => two => three}`);
                        const last: SpwItem | undefined = getLastRegisteredNode(runtime);
                        const all: SpwItem[]            = getAllRegisteredNodes(runtime);

                        expect(last?.kind).toEqual(DomainNode.kind);
                        expect(last?.key).toEqual('{_<boon> one => two => three}');
                        expect(all.length).toEqual(15);

                        const indexedDelimiter = runtime.locateNode('{_<boon>')[0]
                        const locatedDelimiter = runtime.locateNode((last as SpwItem)?.raw.open)[0];
                        expect(indexedDelimiter).toBeInstanceOf(SpwNode);
                        expect(indexedDelimiter).toEqual(locatedDelimiter);
                        done();
                    })()
                });
         })