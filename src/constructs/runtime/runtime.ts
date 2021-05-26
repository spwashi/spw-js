import {Register} from '@constructs/runtime/register';

export type Runtime = {
    registers: {
        all: Register;
        lastAcknowledged: Register;
    }
};