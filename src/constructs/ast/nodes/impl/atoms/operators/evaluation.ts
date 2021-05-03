import SpwOperator from './abstract/operator';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {staticImplements} from '@constructs/ast/util/staticImplements';
import {IAtomicSpwOperatorStatic} from './abstract/types/atomic';

type Token = '?';
type Kind = 'evaluation';

const token: Token = '?';
const kind: Kind   = 'evaluation';

@staticImplements<ISpwItemStatic<Kind> & IAtomicSpwOperatorStatic<Token>>()
export class EvaluationOperator extends SpwOperator<Kind, Token> {
    static readonly kind: Kind   = kind;
    static readonly token: Token = token;
}
