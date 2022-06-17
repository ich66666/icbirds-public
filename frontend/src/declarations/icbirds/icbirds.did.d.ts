import type { Principal } from '@dfinity/principal';
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
  'status_code' : number,
}
export interface ICPTs { 'e8s' : bigint }
export interface Listing {
  'tokenId' : bigint,
  'owner' : Principal,
  'timestamp' : Time,
  'price' : bigint,
}
export interface MintRequest {
  'url' : string,
  'owner' : Principal,
  'data' : Array<number>,
  'desc' : string,
  'name' : string,
  'content_type' : string,
  'properties' : Array<Property>,
}
export interface Property { 'value' : string, 'name' : string }
export type Result = { 'Ok' : string } |
  { 'Err' : string };
export interface StreamingCallbackHttpResponse {
  'token' : [] | [Token],
  'body' : Array<number>,
}
export type StreamingStrategy = {
    'Callback' : { 'token' : Token, 'callback' : [Principal, string] }
  };
export type Time = bigint;
export type Token = {};
export interface TokenDesc {
  'id' : bigint,
  'url' : string,
  'owner' : Principal,
  'desc' : string,
  'name' : string,
  'properties' : Array<Property>,
}
export interface TransactionNotification {
  'to' : Principal,
  'to_subaccount' : [] | [number],
  'from' : Principal,
  'memo' : bigint,
  'from_subaccount' : [] | [number],
  'amount' : ICPTs,
  'block_height' : bigint,
}
export interface _SERVICE {
  'add_genesis_record' : () => Promise<bigint>,
  'creators_fee' : () => Promise<bigint>,
  'data_of' : (arg_0: bigint) => Promise<TokenDesc>,
  'delist' : (arg_0: bigint) => Promise<boolean>,
  'description' : () => Promise<string>,
  'get_cycles' : () => Promise<bigint>,
  'get_ledger_canister' : () => Promise<Principal>,
  'get_listed' : (arg_0: bigint) => Promise<Array<Listing>>,
  'get_listed_count' : () => Promise<bigint>,
  'get_storage_canister' : () => Promise<Principal>,
  'http_request' : (arg_0: HttpRequest) => Promise<HttpResponse>,
  'icon_url' : () => Promise<string>,
  'list' : (arg_0: bigint, arg_1: bigint) => Promise<boolean>,
  'mint' : (arg_0: MintRequest) => Promise<bigint>,
  'multi_mint' : (arg_0: Array<MintRequest>) => Promise<Array<bigint>>,
  'name' : () => Promise<string>,
  'owner' : () => Promise<Principal>,
  'owner_of' : (arg_0: bigint) => Promise<Principal>,
  'set_description' : (arg_0: string) => Promise<boolean>,
  'set_icon_url' : (arg_0: string) => Promise<boolean>,
  'set_ledger_canister' : (arg_0: Principal) => Promise<boolean>,
  'set_owner' : (arg_0: Principal) => Promise<boolean>,
  'set_storage_canister' : (arg_0: Principal) => Promise<boolean>,
  'set_tx_enabled' : (arg_0: boolean) => Promise<boolean>,
  'symbol' : () => Promise<string>,
  'total_supply' : () => Promise<bigint>,
  'transaction_notification' : (arg_0: TransactionNotification) => Promise<
      Result
    >,
  'transfer_to' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'tx_enabled' : () => Promise<boolean>,
  'user_tokens' : (arg_0: Principal) => Promise<Array<bigint>>,
}
