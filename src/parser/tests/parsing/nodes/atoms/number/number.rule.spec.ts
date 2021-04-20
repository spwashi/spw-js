import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../../../util';

describe('Numbers', () => {
    it('Can be parsed',
       async (done) => {
           try {
               const runtime = await startRuntimeWithSrc(`890`);
               const all     = getAllRegisteredNodes(runtime);
               const last    = getLastRegisteredNode(runtime);
               expect(all.length).toEqual(1);
               expect(last?.key).toEqual(890);
               done();
           } catch (e) {
               console.log(e);
           }
       })

})