import {Register} from '@constructs/runtime/register/register';

export type RuntimeRegisters =
    {
        all: Register;
        indexed: Map<any, Register>;
        subject: Register
    };