import { ConstructKind } from '@constructs/ast/_types/kind';
import { SpwNodeLocation } from '../../_util/ast/location';

export interface HydratedSpwItem {
  kind: ConstructKind;
  location?: SpwNodeLocation | null;

  [k: string]:
    | HydratedSpwItem
    | HydratedSpwItem[]
    | ConstructKind
    | SpwNodeLocation
    | unknown;
}

export interface RawSpwConstruct {
  kind: ConstructKind;
  location?: SpwNodeLocation | null;
  src?: string;

  [k: string]:
    | RawSpwConstruct
    | RawSpwConstruct[]
    | string
    | SpwNodeLocation
    | unknown;
}

export type SpwItemValue = Record<string, unknown> | string | null;
