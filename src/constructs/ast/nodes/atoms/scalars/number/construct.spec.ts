import {selectAllNodes, selectLastAcknowledgedNode} from '../../../../_util/runtime/selectors';
import {NumberNode} from '@constructs/ast/nodes/atoms/scalars/number/construct';
import {initRuntime} from '@constructs/ast/_util/runtime/initializers/runtime';

describe(NumberNode.name, () => {
    it('Can be parsed',
       async (done) => {
           try {
               const runtime = await initRuntime(`890`);
               const all     = selectAllNodes(runtime);
               const last    = selectLastAcknowledgedNode(runtime);
               expect(all.length).toEqual(1);
               expect(last?.key).toEqual('890');
               done();
           } catch (e) {
               console.log(e);
           }
       })

})