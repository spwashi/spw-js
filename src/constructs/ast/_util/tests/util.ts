import {SpwItem} from '@constructs/ast/_abstract/item';
import {Parser, Runtime} from '@constructs/runtime/runtime';
import {SpwDocument} from '@constructs/runtime/spwDocument';
import {spwParser} from '../../../../parser/generated';

export function getAllRegisteredNodes(runtime: Runtime): SpwItem[] {
    const registerValues = runtime.registers.all.entries ?? [];
    return registerValues.map(entry => entry.item);
}

export function getLastRegisteredNode(runtime: Runtime): SpwItem | undefined {
    return runtime.registers.lastAcknowledged.entries?.[0]?.item;
}

export async function startRuntimeWithSrc(src: string): Promise<Runtime> {
    const moduleID = 'test';
    const runtime  = new Runtime(spwParser as unknown as Parser);
    runtime.loadDocument(new SpwDocument(moduleID, src))
    return runtime;
}