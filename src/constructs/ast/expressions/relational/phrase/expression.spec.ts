import { PhraseExpression, StrandExpression } from '@constructs/ast';
import { phraseExpressionRule } from '@grammar/ast/expressions/relational/phrase/rule';
import { Construct } from '../../../_abstract/construct';
import {
  selectAllNodes,
  selectLastAcknowledgedNode,
} from '../../../../runtime/_util/selectors';
import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';

describe('Rule', () => {
  it('should exist', function () {
    expect(phraseExpressionRule.ruleName).toEqual(PhraseExpression.name);
  });
});
describe('Phrase Expressions', () => {
  it('is a sequence of nodes separated by spaces', async (done) => {
    const runtime = await initRuntime(`
                                boon < boon > { boon } boon => two 
                                    => three
                              `);

    const last: Construct | undefined = selectLastAcknowledgedNode(runtime);
    const all: Construct[] = selectAllNodes(runtime);
    expect(all.length).toEqual(18);
    expect(last?.kind).toEqual(StrandExpression.kind);
    expect(last?.key).toEqual('boon <boon> {boon} boon=>two=>three');
    done();
  });
});
