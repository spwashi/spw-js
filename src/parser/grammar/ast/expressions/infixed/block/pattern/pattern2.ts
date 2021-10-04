import { headComponent } from './_components/_combo/head';

// Only Head
// language=JavaScript

const pattern = headComponent.pattern.named(headComponent.name);
const action = `return [...${headComponent.name}]`;
export const pattern2 = pattern.withAction(action);
