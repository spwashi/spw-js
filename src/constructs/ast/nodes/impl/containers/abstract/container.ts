import {SpwNode} from '../../../abstract/node';
import {staticImplements} from '../../../../util/staticImplements';

type IContainerNodeStatic =
    {
        openToken: string;
        closeToken: string;
    };

@staticImplements<IContainerNodeStatic>()
export abstract class ContainerNode extends SpwNode {
    static readonly openToken: string  = 'undefined';
    static readonly closeToken: string = 'undefined';
}