import {SpwItemKind} from '@constructs/ast/_types/kind';
import {SpwNodeLocation} from '../../_util/location';

export interface HydratedSpwItem {
    kind: SpwItemKind;
    location?: SpwNodeLocation | null;

    [k: string]: HydratedSpwItem | HydratedSpwItem[] | SpwItemKind | SpwNodeLocation | unknown
}

export interface RawSpwItem {
    kind: SpwItemKind,
    location?: SpwNodeLocation | null;
    src?: string;

    [k: string]: RawSpwItem | RawSpwItem[] | string | SpwNodeLocation | unknown;
}

export type SpwItemValue =
    Record<string, unknown>
    | string
    | null;