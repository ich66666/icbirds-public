import type { Principal } from '@dfinity/principal';
export interface Score {
  'getCallerPrincipal' : () => Promise<Principal>,
  'get_all_score' : () => Promise<Array<[Principal, bigint]>>,
  'get_max_score' : (arg_0: Principal) => Promise<bigint>,
  'setFrontEnd' : (arg_0: string) => Promise<undefined>,
  'set_new_score' : (arg_0: Principal, arg_1: bigint) => Promise<undefined>,
}
export interface _SERVICE extends Score {}
