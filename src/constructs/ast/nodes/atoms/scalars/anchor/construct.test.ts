import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../../../../_util/tests/util';
import {AnchorNode} from '@constructs/ast';
import faker from 'faker';

describe('AnchorNodes',
         () => {
             it('Can be parsed',
                async () => {
                    const key     = `${faker.random.alpha({count: 10})}`
                    const runtime = await startRuntimeWithSrc(key);
                    const all     = getAllRegisteredNodes(runtime);
                    const last    = getLastRegisteredNode(runtime);
                    expect(AnchorNode.isAnchorNode(last)).toBeTruthy();
                    expect(all.length).toEqual(1);
                    expect(last?.key).toEqual(key);
                });
         })