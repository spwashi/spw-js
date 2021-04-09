import {SpwNodeKind} from '@constructs/index';
import {SpwNodeLocation} from '../../../../util/location';

export interface UnhydratedSpwItem {
    kind: SpwNodeKind,
    location: SpwNodeLocation;
    key?: string;
    src: string;

    [k: string]: UnhydratedSpwItem | UnhydratedSpwItem[] | string | SpwNodeLocation | any
}

export interface ISpwNode {
}