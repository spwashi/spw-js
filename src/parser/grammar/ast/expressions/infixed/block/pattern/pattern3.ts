import { tailComponent } from './_components/_combo/tail';

// Only Tail
// language=JavaScript

const pattern = tailComponent.pattern.named(tailComponent.name);
const action = `return [${tailComponent.name}];`;
export const pattern3 = pattern.withAction(action);
