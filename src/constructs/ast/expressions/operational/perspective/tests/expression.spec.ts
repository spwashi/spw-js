import { PerspectiveExpression } from '@constructs/ast';
import { perspectiveExpressionRule } from '@grammar/ast/expressions/operational/perspective/rule';
import {
  selectAllNodes,
  selectLastAcknowledgedNode,
} from '../../../../../runtime/_util/selectors';
import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';

describe('Rule', () => {
  it('should exist', function () {
    expect(perspectiveExpressionRule.ruleName).toEqual(
      PerspectiveExpression.name,
    );
  });
});

describe('Perspective Expressions', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntime(`actor@_lens[spec]target`);

    const last = selectLastAcknowledgedNode(runtime);
    const all = selectAllNodes(runtime);

    if (!PerspectiveExpression.isPerspectiveExpression(last)) {
      throw new Error('Expected a perspective expression');
    }

    expect(last.kind).toEqual(PerspectiveExpression.kind);
    expect(last.key).toEqual('actor@_lens[spec]->target');
    expect(all.length).toEqual(11);

    done();
  });
});
