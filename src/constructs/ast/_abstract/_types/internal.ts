import { ConstructKind } from '@constructs/top/kinds';
import { ConstructLocation } from '../../_util/ast/location';

export interface HydratedConstruct {
  kind: ConstructKind;
  location?: ConstructLocation | null;

  [k: string]:
    | HydratedConstruct
    | HydratedConstruct[]
    | ConstructKind
    | ConstructLocation
    | unknown;
}

export interface RawConstruct {
  kind: ConstructKind;
  srcloc?: ConstructLocation | null;
  src?: string;

  [k: string]: RawConstruct | RawConstruct[] | string | ConstructLocation | unknown;
}

export type ConstructComponentValue = Record<string, unknown> | string | null;
