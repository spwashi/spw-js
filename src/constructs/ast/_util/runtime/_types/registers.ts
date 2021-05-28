import {Register} from '@constructs/runtime/register';

export type RuntimeRegisters =
    {
        all: Register;
        keys: { [p: string]: Register };
        lastAcknowledged: Register
    };