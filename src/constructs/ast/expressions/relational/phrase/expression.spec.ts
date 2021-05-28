import {PhraseExpression, StrandExpression} from '@constructs/ast';
import {phraseExpressionRule} from '@grammar/ast/expressions/relational/phrase/rule';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {selectAllNodes, selectLastAcknowledgedNode} from '../../../_util/runtime/selectors';
import {initRuntime} from '@constructs/ast/_util/runtime/initRuntime';

describe('Rule', () => {
    it('should exist', function () {
        expect(phraseExpressionRule.ruleName)
            .toEqual(PhraseExpression.name);
    });
});
describe('Phrase Expressions',
         () => {
             it('is a sequence of nodes separated by spaces',
                async (done) => {
                    const runtime =
                              await initRuntime(`
                                boon < boon > { boon } boon => two 
                                    => three
                              `);

                    const last: SpwConstruct | undefined = selectLastAcknowledgedNode(runtime);
                    const all: SpwConstruct[]            = selectAllNodes(runtime);
                    expect(all.length).toEqual(18);
                    expect(last?.kind).toEqual(StrandExpression.kind);
                    expect(last?.key).toEqual('boon <boon> {boon} boon=>two=>three');
                    done()
                });
         })