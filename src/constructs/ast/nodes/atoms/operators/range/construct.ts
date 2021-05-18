import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwConstructStatic, ConstructComponents} from '@constructs/ast/_abstract/construct';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator, {operatorComponents} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type RangeToken = '..';

@staticImplements<ISpwConstructStatic<'range'> & IAtomicSpwOperatorStatic<'..'>>()
export class RangeOperator extends SpwOperator<'range'> {
    static kind: 'range' = 'range';

    static token: RangeToken = '..';

    static components: ConstructComponents = operatorComponents(RangeOperator);
}