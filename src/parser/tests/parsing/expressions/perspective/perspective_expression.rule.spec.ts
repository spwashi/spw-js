import {PerspectiveExpression} from '@constructs/ast';
import {perspectiveExpressionRule} from '@grammar/expressions/perspective/perspective_expression.rule';
import {Rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {getAllRegisteredNodes, getLastRegisteredNode, startRuntimeWithSrc} from '../../util';

describe('Rule', () => {
    it('should exist', function () {
        expect(perspectiveExpressionRule).toBeInstanceOf(Rule);
        expect(perspectiveExpressionRule.ruleName)
            .toEqual(PerspectiveExpression.name);
    });
});

describe('Perspective Expressions',
         () => {
             it('can be parsed',
                async done => {
                    const runtime = await startRuntimeWithSrc(`actor@_lens[spec]target`);
                    const last    = getLastRegisteredNode(runtime);
                    const all     = getAllRegisteredNodes(runtime);
                    if (!PerspectiveExpression.isPerspectiveExpression(last)) {
                        throw new Error('Expected a perspective expression')
                    }
                    expect(last.kind).toEqual(PerspectiveExpression.kind);
                    expect(last.key).toEqual('actor@_lens[spec] target');
                    expect(all.length).toEqual(9);
                    done();
                });
         })