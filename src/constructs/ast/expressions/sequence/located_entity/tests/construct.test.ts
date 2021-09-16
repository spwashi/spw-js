import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { locatedEntityExpressionRule } from '@grammar/ast/expressions/sequence/located_entity/rule';
import { LocatedEntityExpression } from '../construct';

describe('Rule', () => {
  it('should exist', function () {
    expect(locatedEntityExpressionRule.ruleName).toEqual(LocatedEntityExpression.name);
  });
});

describe('LocatedEntityExpression', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`(somewhere) <something>someone`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);

    if (!LocatedEntityExpression.isLocatedEntityExpression(last)) {
      throw new Error('Expected a Node expression');
    }

    expect(last.kind).toEqual(LocatedEntityExpression.kind);
    expect(last.key).toEqual('(somewhere)<something>someone');
    expect(all.length).toEqual(11);

    done();
  });
});
