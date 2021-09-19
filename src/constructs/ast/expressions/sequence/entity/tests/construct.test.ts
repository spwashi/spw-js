import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import { getSalientNode } from '@constructs/runtime/_util/initializers/runtime/initRuntimeWithSrc';
import { selectAllNodesFromRuntime } from '@constructs/runtime/_util/selectors';
import { entityExpressionRule } from '@grammar/ast/expressions/sequence/entity/rule';
import { EntityExpression } from '../construct';

describe('Rule', () => {
  it('should exist', function () {
    expect(entityExpressionRule.ruleName).toEqual(EntityExpression.name);
  });
});

describe('EntityExpression', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`<conceptual_anchor>name`);
    const last = getSalientNode(`<conceptual_anchor>name`);
    const all = selectAllNodesFromRuntime(runtime);

    if (!EntityExpression.isEntityExpression(last)) {
      throw new Error(
        `Expected a ${EntityExpression.name}. Received a ${
          last?.kind ?? JSON.stringify(last, null, 3)
        }`,
      );
    }

    expect(last?.kind).toEqual(EntityExpression.kind);
    expect(last?.key).toEqual('<conceptual_anchor>name');
    expect(all.length).toEqual(6);

    done();
  });
});