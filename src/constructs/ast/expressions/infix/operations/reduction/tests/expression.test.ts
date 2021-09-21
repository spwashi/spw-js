import { StrandExpression, TransformationOperator } from '@constructs/ast';
import { ReductionExpression } from '@constructs/ast/expressions/infix/operations/reduction/expression';
import {
  getAllNodes,
  getSalientNode,
} from '@constructs/runtime/_util/initializers/runtime/initRuntimeWithSrc';

describe('Reduction Expression', () => {
  const op = '-';
  const trans = TransformationOperator.token;
  it('is serialized the way we expect it to be', async (done) => {
    const src = `test test test ${op}    test    ${op}    test`;
    const last = getSalientNode(src);
    const all = getAllNodes(src);
    expect(last?.kind).toEqual(ReductionExpression.kind);
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
