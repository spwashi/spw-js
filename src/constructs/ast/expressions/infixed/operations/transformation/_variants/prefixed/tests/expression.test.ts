import { PrefixedTransformationExpression } from '@constructs/ast';
import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import * as util from 'util';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '../../../../../../../../runtime/_util/selectors';
import { Construct } from '../../../../../../../_abstract/construct';

describe('Transformation Expressions', () => {
  it('is serialized the way we expect it to be', async (done) => {
    let all: Construct[] = [];
    let last: Construct | undefined = undefined;
    try {
      const runtime = await initRuntimeWithSrc(`=>    test    =>    test`);
      last = selectLastAcknowledgedNodeFromRuntime(runtime);
      all = selectAllNodesFromRuntime(runtime);
      expect(last?.kind).toEqual(PrefixedTransformationExpression.kind);
      console.log(all[0].internal);
      expect(all.length).toEqual(7);
      expect(last?.key).toEqual(`=>test=>test`);
      done();
    } catch (e) {
      console.log(util.inspect(e, { depth: null, colors: true }));
      throw new Error('Parsing Error');
    }
  });

  it('has the operator precedence we expect', async (done) => {
    const runtime = await initRuntimeWithSrc(`
                                => two 
                                    => three
                              `);

    const last: Construct | undefined = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all: Construct[] = selectAllNodesFromRuntime(runtime);
    expect(all.length).toEqual(7);
    expect(last?.kind).toEqual(PrefixedTransformationExpression.kind);
    expect(last?.key).toEqual('=>two=>three');
    done();
  });
});