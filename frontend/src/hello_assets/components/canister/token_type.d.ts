import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Metadata {
  'fee' : BigInt,
  'decimals' : number,
  'owner' : Principal,
  'logo' : string,
  'name' : string,
  'totalSupply' : BigInt,
  'symbol' : string,
}
export type Time = BigInt;
export interface Token {
  'allowance' : ActorMethod<[Principal, Principal], BigInt>,
  'approve' : ActorMethod<[Principal, BigInt], TxReceipt>,
  'balanceOf' : ActorMethod<[Principal], BigInt>,
  'burn' : ActorMethod<[BigInt], TxReceipt>,
  'decimals' : ActorMethod<[], number>,
  'getAllowanceSize' : ActorMethod<[], BigInt>,
  'getHolders' : ActorMethod<[BigInt, BigInt], Array<[Principal, BigInt]>>,
  'getMetadata' : ActorMethod<[], Metadata>,
  'getNextClaimTime' : ActorMethod<[BigInt], BigInt>,
  'getTokenFee' : ActorMethod<[], BigInt>,
  'getTokenInfo' : ActorMethod<[], TokenInfo>,
  'getTokens' : ActorMethod<[], BigInt>,
  'getUserApprovals' : ActorMethod<[Principal], Array<[Principal, BigInt]>>,
  'historySize' : ActorMethod<[], BigInt>,
  'logo' : ActorMethod<[], string>,
  'mint' : ActorMethod<[Principal, BigInt], TxReceipt>,
  'name' : ActorMethod<[], string>,
  'setFee' : ActorMethod<[BigInt], undefined>,
  'setFeeTo' : ActorMethod<[Principal], undefined>,
  'setLogo' : ActorMethod<[string], undefined>,
  'setName' : ActorMethod<[string], undefined>,
  'setOwner' : ActorMethod<[Principal], undefined>,
  'symbol' : ActorMethod<[], string>,
  'totalSupply' : ActorMethod<[], BigInt>,
  'transfer' : ActorMethod<[Principal, BigInt], TxReceipt>,
  'transferFrom' : ActorMethod<[Principal, Principal, BigInt], TxReceipt>,
}
export interface TokenInfo {
  'holderNumber' : BigInt,
  'deployTime' : Time,
  'metadata' : Metadata,
  'historySize' : BigInt,
  'cycles' : BigInt,
  'feeTo' : Principal,
}
export type TxReceipt = { 'Ok' : BigInt } |
  {
    'Err' : { 'InsufficientAllowance' : null } |
      { 'InsufficientBalance' : null } |
      { 'ErrorOperationStyle' : null } |
      { 'Unauthorized' : null } |
      { 'LedgerTrap' : null } |
      { 'ErrorTo' : null } |
      { 'Other' : string } |
      { 'BlockUsed' : null } |
      { 'AmountTooSmall' : null }
  };
// export interface _SERVICE extends Token {}
