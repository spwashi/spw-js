import { PhraseExpression } from '@constructs/ast';
import {
  getAllNodes,
  getSalientNode,
} from '@constructs/runtime/_util/initializers/runtime/initRuntimeWithSrc';
import { instanceExpressionRule } from '@grammar/ast/expressions/sequences/instance/rule';
import { InstanceExpression } from '../construct';

describe('Rule', () => {
  it('should exist', function () {
    expect(instanceExpressionRule.ruleName).toEqual(InstanceExpression.name);
  });
});

describe('Basic InstanceExpression', () => {
  it('can be parsed', async () => {
    const test_input = `< >something( ){ }[ ]`;
    const test_expectedKey = `<>something(){}[]`;
    const cache = {};
    const last = getSalientNode(test_input, cache);
    const all = getAllNodes(test_input, cache);
    expect(last?.key).toEqual(test_expectedKey);
    expect(all.length).toEqual(16);
  });
  it('can be identified', async () => {
    const test_input = `< >something( ){ }[ ]`;
    const cache = {};
    const last = getSalientNode(test_input, cache);
    expect(last?.kind).toEqual(InstanceExpression.kind);
    if (!InstanceExpression.isInstanceExpression(last)) {
      throw new Error('Expected an ' + InstanceExpression.name);
    }
  });
});

describe('Complex InstanceExpression', () => {
  it('can be parsed as expected (1)', async () => {
    const cache = {};
    const test_input = `(< >something( ){ }[ ]) is (< >something( ){ }[ ])`;
    const test_expectedKey = `(<>something(){}[]) is (<>something(){}[])`;

    const all = getAllNodes(test_input, cache);
    expect(all.length).toEqual(42);

    const last = getSalientNode(test_input, cache);
    expect(last?.kind).toEqual(PhraseExpression.kind);
    expect(last?.key).toEqual(test_expectedKey);
  });
  it('can be parsed as expected (2)', async () => {
    const cache = {};
    const test_input = `(< concept >something( location, location ){ domain }[ essence ]) is (< concept >something( ){ }[ ])`;
    const test_expectedKey = `(<concept>something(location,location){domain}[essence]) is (<concept>something(){}[])`;

    const all = getAllNodes(test_input, cache);
    expect(all.length).toEqual(56);

    const last = getSalientNode(test_input, cache);
    expect(last?.kind).toEqual(PhraseExpression.kind);
    expect(last?.key).toEqual(test_expectedKey);
  });
});
