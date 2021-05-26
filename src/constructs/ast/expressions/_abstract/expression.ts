import {ConstructKind} from '../../_types/kind';
import {SpwConstruct} from '../../_abstract/spwConstruct';

export abstract class SpwExpression<Kind extends ConstructKind, U extends any = any> extends SpwConstruct<Kind, U> {

}