import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwConstructStatic, ConstructComponents} from '@constructs/ast/_abstract/construct';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator, {operatorComponents} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type ReferenceToken = '&';

@staticImplements<ISpwConstructStatic<'reference'> & IAtomicSpwOperatorStatic<'&'>>()
export class ReferenceOperator extends SpwOperator<'reference'> {
    static kind: 'reference' = 'reference';

    static token: ReferenceToken = '&';

    static components: ConstructComponents = operatorComponents(ReferenceOperator);
}