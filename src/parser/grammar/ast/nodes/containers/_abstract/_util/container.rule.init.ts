import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { createContainerBodyRules, createContainerPattern } from './components/body.rule.init';
import { createDelimiterRule, IDelimiter } from './components/delimiter.rule.init';

export const createContainerRules = ({
  name: ruleName,
  kind,
  openDelimiter,
  closeDelimiter,
}: {
  name: string;
  kind: string;
  closeDelimiter: IDelimiter;
  openDelimiter: IDelimiter;
}): Rule[] => {
  const opener = createDelimiterRule(ruleName, openDelimiter, 'open');
  const closer = createDelimiterRule(ruleName, closeDelimiter, 'close');
  const body = createContainerBodyRules(ruleName);
  const pattern = sequenceOf([createContainerPattern(ruleName).named('container')]);
  const _ruleAction =
    // language=JavaScript
    `
      return toConstruct({
                           kind: '${kind}',
                           open: container.open,
                           body: container.body,
                           close: container.close,
                         })
    `;
  return [opener, closer, ...body, new Rule(ruleName, pattern, _ruleAction)];
};
