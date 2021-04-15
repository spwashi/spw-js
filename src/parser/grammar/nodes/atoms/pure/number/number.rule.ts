import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';

const numberPattern     = combinators.oneOrMoreOf(combinators.regExpLike('\\d')).named('num');
const numberComponent   = combinators.sequenceOf([numberPattern])
const _action           = /* language=JavaScript */ `return toSpwItem({kind: 'number', value: parseInt(num.join(''))});`;
export const numberRule = new Rule('Number', numberComponent, _action);
