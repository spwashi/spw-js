import { StrandExpression, TransformationOperator } from '@constructs/ast';
import { AggregationExpression } from '@constructs/ast/expressions/infix/operations/aggregation/expression';
import {
  getAllNodes,
  getSalientNode,
} from '@constructs/runtime/_util/initializers/runtime/initRuntimeWithSrc';

describe('Aggregation Expression', () => {
  const op = '+';
  const trans = TransformationOperator.token;
  it('is serialized the way we expect it to be', async (done) => {
    const src = `test test test ${op}    test    ${op}    test`;
    const last = getSalientNode(src);
    const all = getAllNodes(src);
    expect(last?.kind).toEqual(AggregationExpression.kind);
    expect(all.length).toEqual(12);
    expect(last?.key).toEqual(`test test test${op}test${op}test`);
    done();
  });

  it('has the operator precedence we expect', async (done) => {
    const src = `boon boon ${trans} two ${op} three`;
    const last = getSalientNode(src);
    const all = getAllNodes(src);
    expect(all.length).toEqual(11);
    expect(last?.kind).toEqual(StrandExpression.kind);
    expect(last?.key).toEqual(`boon boon${trans}two${op}three`);
    done();
  });
});
