import { InfixedTransformationExpression } from '@constructs/ast';
import { CommonExpression } from '@constructs/ast/expressions/infix/common/expression';
import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import * as util from 'util';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '../../../../../runtime/_util/selectors';
import { Construct } from '../../../../_abstract/construct';

describe(CommonExpression.name, () => {
  it('is serialized the way we expect it to be', async (done) => {
    let all: Construct[] = [];
    let items: Construct | undefined = undefined;
    try {
      const runtime = await initRuntimeWithSrc(`test test, test`);
      items = selectLastAcknowledgedNodeFromRuntime(runtime);
      all = selectAllNodesFromRuntime(runtime);
      expect(items?.kind).toEqual(CommonExpression.kind);
      expect(all.length).toEqual(7);
      expect(items?.key).toEqual(`test test,test`);
      done();
    } catch (e) {
      console.log(util.inspect(e, { depth: null, colors: true }));
      throw new Error('Parsing Error');
    }
  });

  it('has the operator precedence we expect', async (done) => {
    const runtime = await initRuntimeWithSrc(`
                                boon boon => two, three
                              `);

    const last: Construct | undefined = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all: Construct[] = selectAllNodesFromRuntime(runtime);
    expect(all.length).toEqual(11);
    expect(last?.kind).toEqual(InfixedTransformationExpression.kind);
    expect(last?.key).toEqual('boon boon=>two,three');
    done();
  });
});
