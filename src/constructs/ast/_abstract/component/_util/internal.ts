import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { nodeScopeConstructComponent } from '@constructs/ast/_abstract/component/_util/components/nodeScope';
import { srcConstructComponent } from '@constructs/ast/_abstract/component/_util/components/src';
import { srclocConstructComponent } from '@constructs/ast/_abstract/component/_util/components/srcloc';

export function getInternalComponents(): ComponentDescription<InteractionContext>[] {
  return [
    nodeScopeConstructComponent,
    srcConstructComponent,
    srclocConstructComponent,
  ] as ComponentDescription<InteractionContext>[];
}
