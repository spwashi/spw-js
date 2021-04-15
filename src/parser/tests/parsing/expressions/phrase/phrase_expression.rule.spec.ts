import {PhraseExpression, StrandExpression} from '@constructs/ast';
import {Rule} from '@spwashi/language/parsers/grammar';
import {phraseExpressionRule} from '@grammar/expressions/phrase/phrase_expression.rule';
import {SpwItem} from '@constructs/ast/abstract/item';
import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../../util';

describe('Rule', () => {
    it('should exist', function () {
        expect(phraseExpressionRule).toBeInstanceOf(Rule);
        expect(phraseExpressionRule.ruleName)
            .toEqual(PhraseExpression.name);
    });
});
describe('Phrase Expressions',
         () => {
             it('is a sequence of nodes separated by spaces',
                async (done) => {
                    const runtime =
                              await startRuntimeWithSrc(`
                                boon < boon > { boon } boon => two 
                                    => three
                              `);

                    const last: SpwItem | undefined = getLastRegisteredNode(runtime);
                    const all: SpwItem[]            = getAllRegisteredNodes(runtime);
                    expect(last?.kind).toEqual(StrandExpression.kind);
                    expect(last?.key).toEqual('boon <boon> {boon} boon=>two=>three');
                    expect(all.length).toEqual(14);
                    done()
                });
         })