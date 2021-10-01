import { PhraseExpression } from '@constructs/ast';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import _head from './_components/head';
import _tail from './_components/tail';
import { ruleName } from './ref';

const head = _head.pattern.named(_head.name);
const tail = _tail.pattern.named(_tail.name);
const pattern = sequenceOf([head, tail]);

// language=JavaScript
const action = `
  const phrase = {
    kind: '${PhraseExpression.kind}',
    ${PhraseExpression.components.items.name}: [${_head.name}, ...${_tail.name}]
  };

  return toConstruct(phrase)
`;

export const phraseExpressionRule = new Rule(ruleName, pattern, action);
