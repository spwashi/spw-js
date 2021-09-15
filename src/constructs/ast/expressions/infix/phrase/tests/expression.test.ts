import { PhraseExpression } from '@constructs/ast';
import { phraseExpressionRule } from '@grammar/ast/expressions/infix/phrase/rule';
import { Construct } from '../../../../_abstract/construct';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '../../../../../runtime/_util/selectors';
import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';

describe('Rule', () => {
  it('should exist', function () {
    expect(phraseExpressionRule.ruleName).toEqual(PhraseExpression.name);
  });
});
describe('Phrase Expressions', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(
      `something <something>something (something){something} something something`,
    );
    const last: Construct | undefined = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all: Construct[] = selectAllNodesFromRuntime(runtime);
    expect(all.length).toEqual(20);
    expect(last?.kind).toEqual(PhraseExpression.kind);
    expect(last?.key).toEqual(
      'something <something>something (something){something} something something',
    );
    done();
  });
});
