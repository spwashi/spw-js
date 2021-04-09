import {Parser, Runtime} from '@constructs/runtime/runtime';
import {SpwDocument} from '@constructs/runtime/spwDocument';
import {spwParser} from '../../generated/parser';
import {SpwItem} from '@constructs/item';

export function getAllRegisteredNodes(runtime: Runtime) {
    let registerValues = runtime.registers.all.entries ?? [];
    return registerValues.map(entry => entry.item);
}

export function getLastRegisteredNode(runtime: Runtime): SpwItem | undefined {
    return runtime.registers.lastAcknowledged.entries?.[0]?.item;
}

export async function startRuntimeWithSrc(src: string) {
    const moduleID = 'test';
    const runtime  = new Runtime(spwParser as unknown as Parser);
    const document = new SpwDocument(moduleID, src);
    await runtime.registerDocument(document);
    await runtime.loadDocument(moduleID)
    return runtime;
}