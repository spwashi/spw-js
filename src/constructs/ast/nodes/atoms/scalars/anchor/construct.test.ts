import {selectAllNodes, selectLastAcknowledgedNode} from '../../../../_util/runtime/selectors';
import {AnchorNode} from '@constructs/ast';
import faker from 'faker';
import {initRuntime} from '@constructs/ast/_util/runtime/initializers/runtime';

describe('AnchorNodes',
         () => {
             it('Can be parsed',
                async () => {
                    const key     = `${faker.random.alpha({count: 10})}`
                    const runtime = await initRuntime(key);
                    const all     = selectAllNodes(runtime);
                    const last    = selectLastAcknowledgedNode(runtime);
                    expect(AnchorNode.isAnchorNode(last)).toBeTruthy();
                    expect(all.length).toEqual(1);
                    expect(last?.key).toEqual(key);
                });
         })