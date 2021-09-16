import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { locatedEssenceExpressionRule } from '@grammar/ast/expressions/sequence/located_essence/rule';
import { LocatedEssenceExpression } from '../construct';

describe('Rule', () => {
  it('should exist', function () {
    expect(locatedEssenceExpressionRule.ruleName).toEqual(LocatedEssenceExpression.name);
  });
});

describe('Located Essence Expressions', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`(location)[essence]`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);

    if (!LocatedEssenceExpression.isLocatedEssenceExpression(last)) {
      throw new Error('Expected a ' + LocatedEssenceExpression.kind);
    }

    expect(last.kind).toEqual(LocatedEssenceExpression.kind);
    expect(last.key).toEqual(`(location)[essence]`);
    expect(all.length).toEqual(9);

    done();
  });
});
