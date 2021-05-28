import {ComponentDescription} from '@constructs/ast/_abstract/_types';
import LanguageComponentConstructor, {LanguageComponentProps} from '@constructs/ast/_abstract/component/component';

/**
 * Returns an object that describes a very generic component
 */
export const LanguageComponent = LanguageComponentConstructor as any as {
    new(override: LanguageComponentProps): ComponentDescription;
}