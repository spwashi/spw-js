import SpwOperator, {operatorComponents} from '../_abstract/operator';
import {ISpwConstructStatic, ConstructComponents} from '@constructs/ast/_abstract/spwConstruct';
import {staticImplements} from '@constructs/ast/_util/typescript/staticImplements';
import {IAtomicSpwOperatorStatic} from '../_abstract/_types/atomic';

type Token = '@';
type Kind = 'perspective';

const token: Token = '@';
const kind: Kind   = 'perspective';

@staticImplements<ISpwConstructStatic<'perspective'> & IAtomicSpwOperatorStatic<'@'>>()
export class PerspectiveOperator extends SpwOperator<Kind> {
    static readonly kind: Kind = kind;

    static readonly token: Token = token;

    static components: ConstructComponents = operatorComponents(PerspectiveOperator);
}
