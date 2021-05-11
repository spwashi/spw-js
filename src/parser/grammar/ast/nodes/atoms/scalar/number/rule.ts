import {oneOrMoreOf, regExpLike, sequenceOf} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {ruleName} from './ref';

const oneOrMoreDigits =
          oneOrMoreOf(
              regExpLike('\\d'),
          );

const numberSequence =
          sequenceOf([
                         oneOrMoreDigits
                             .named('num'),
                     ]);

const _action =
          // language=JavaScript
          `
              return toSpwItem({
                                   kind:  'number',
                                   value: parseInt(num.join(''))
                               });
          `;

export const numberRule = new Rule(ruleName, numberSequence, _action);
