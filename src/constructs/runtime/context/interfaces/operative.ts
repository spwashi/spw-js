import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {Register} from '@constructs/runtime/register/register';
import {ConstructContext} from '@constructs/runtime/context/interfaces/index';

/**
 * Pushed when an operator is encountered
 *
 *  @example
 *  const next =
 *      new OperativeContext({
 *          operator,
 *          subject:
 *              new Register([], {memory: 1}),
 *          setting:
 *              new Register([...context.setting?.flat]),
 *      });

 */
export interface OperativeContext extends ConstructContext {
    operator: SpwConstruct;
    subject: Register<SpwConstruct>;
}