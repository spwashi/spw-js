import { selectAllNodes, selectLastAcknowledgedNode } from '../../../../../runtime/_util/selectors';
import { StrandExpression } from '@constructs/ast/expressions/infix/strand/expression';
import { Construct } from '../../../../_abstract/construct';
import * as util from 'util';
import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';

describe('Strand Expressions', () => {
  it('is serialized the way we expect it to be', async (done) => {
    let all: Construct[] = [];
    let last: Construct | undefined = undefined;
    try {
      const runtime = await initRuntime(`
test test test =>    test    =>    test
`);
      last = selectLastAcknowledgedNode(runtime);
      all = selectAllNodes(runtime);
      expect(last?.kind).toEqual(StrandExpression.kind);
      expect(all.length).toEqual(12);
      expect(last?.key).toEqual(`test test test=>test=>test`);
      done();
    } catch (e) {
      console.log(util.inspect(e, { depth: null, colors: true }));
      throw new Error('Parsing Error');
    }
  });

  it('has the operator precedence we expect', async (done) => {
    const runtime = await initRuntime(`
                                boon boon => two 
                                    => three
                              `);

    const last: Construct | undefined = selectLastAcknowledgedNode(runtime);
    const all: Construct[] = selectAllNodes(runtime);
    expect(all.length).toEqual(11);
    expect(last?.kind).toEqual(StrandExpression.kind);
    expect(last?.key).toEqual('boon boon=>two=>three');
    done();
  });
});
