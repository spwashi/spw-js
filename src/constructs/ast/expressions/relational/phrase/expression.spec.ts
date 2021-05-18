import {PhraseExpression, StrandExpression} from '@constructs/ast';
import {phraseExpressionRule} from '@grammar/ast/expressions/relational/phrase/rule';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../../../_util/tests/util';

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
                              await startRuntimeWithSrc(`
                                boon < boon > { boon } boon => two 
                                    => three
                              `);

                    const last: SpwConstruct | undefined = getLastRegisteredNode(runtime);
                    const all: SpwConstruct[]            = getAllRegisteredNodes(runtime);
                    expect(all.length).toEqual(18);
                    expect(last?.kind).toEqual(StrandExpression.kind);
                    expect(last?.key).toEqual('boon <boon> {boon} boon=>two=>three');
                    done()
                });
         })