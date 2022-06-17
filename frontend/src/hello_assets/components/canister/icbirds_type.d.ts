import type { Principal } from '@dfinity/agent';

export interface ICPTs { 'e8s' : bigint };

const Actor = require("@dfinity/agent").Actor;
const HttpResponse = require("@dfinity/agent").HttpResponse;
const HttpRequest = require("@dfinity/agent").HttpRequest;

import type { Principal } from '@dfinity/agent';
export type AccountIdentifier = string;
export type AccountIdentifier__1 = string;
export type AssetHandle = string;
export type Balance = bigint;
export interface BalanceRequest { 'token' : TokenIdentifier, 'user' : User };
export type BalanceResponse = { 'ok' : Balance } |
  { 'err' : CommonError__1 };
export type Balance__1 = bigint;
export type CommonError = { 'InvalidToken' : TokenIdentifier } |
  { 'Other' : string };
export type CommonError__1 = { 'InvalidToken' : TokenIdentifier } |
  { 'Other' : string };
export type Extension = string;
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
};
export interface HttpResponse {
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [HttpStreamingStrategy],
  'status_code' : number,
};
export interface HttpStreamingCallbackResponse {
  'token' : [] | [HttpStreamingCallbackToken],
  'body' : Array<number>,
};
export interface HttpStreamingCallbackToken {
  'key' : string,
  'sha256' : [] | [Array<number>],
  'index' : bigint,
  'content_encoding' : string,
};
export type HttpStreamingStrategy = {
    'Callback' : {
      'token' : HttpStreamingCallbackToken,
      'callback' : [Principal, string],
    }
  };
export interface ListRequest {
  'token' : TokenIdentifier__1,
  'from_subaccount' : [] | [SubAccount],
  'price' : [] | [bigint],
};
export interface Listing {
  'locked' : [] | [Time],
  'seller' : Principal,
  'price' : bigint,
};
export type Memo = Array<number>;
export type Metadata = {
    'fungible' : {
      'decimals' : number,
      'metadata' : [] | [Array<number>],
      'name' : string,
      'symbol' : string,
    }
  } |
  { 'nonfungible' : { 'metadata' : [] | [Array<number>] } };
export type Result = {
    'ok' : Array<[TokenIndex, [] | [Listing], [] | [Array<number>]]>
  } |
  { 'err' : CommonError };
export type Result_1 = { 'ok' : Array<TokenIndex> } |
  { 'err' : CommonError };
export type Result_2 = { 'ok' : Balance__1 } |
  { 'err' : CommonError };
export type Result_3 = { 'ok' : null } |
  { 'err' : CommonError };
export type Result_4 = { 'ok' : null } |
  { 'err' : string };
export type Result_5 = { 'ok' : [AccountIdentifier, bigint] } |
  { 'err' : string };
export type Result_6 = { 'ok' : Metadata } |
  { 'err' : CommonError };
export type Result_7 = { 'ok' : AccountIdentifier } |
  { 'err' : CommonError };
export type Result_8 = { 'ok' : [AccountIdentifier, [] | [Listing]] } |
  { 'err' : CommonError };
export interface Sale {
  'expires' : Time,
  'subaccount' : SubAccount,
  'tokens' : Array<TokenIndex>,
  'buyer' : AccountIdentifier,
  'price' : bigint,
};
export interface SaleSettings {
  'startTime' : Time,
  'whitelist' : boolean,
  'totalToSell' : bigint,
  'sold' : bigint,
  'bulkPricing' : Array<[bigint, bigint]>,
  'whitelistTime' : Time,
  'salePrice' : bigint,
  'remaining' : bigint,
  'price' : bigint,
};
export interface SaleTransaction {
  'time' : Time,
  'seller' : Principal,
  'tokens' : Array<TokenIndex>,
  'buyer' : AccountIdentifier,
  'price' : bigint,
};
export interface Settlement {
  'subaccount' : SubAccount,
  'seller' : Principal,
  'buyer' : AccountIdentifier,
  'price' : bigint,
};
export type SubAccount = Array<number>;
export type SubAccount__1 = Array<number>;
export type Time = bigint;
export type TokenIdentifier = string;
export type TokenIdentifier__1 = string;
export type TokenIndex = number;
export interface Transaction {
  'token' : TokenIdentifier__1,
  'time' : Time,
  'seller' : Principal,
  'buyer' : AccountIdentifier,
  'price' : bigint,
};
export interface TransferRequest {
  'to' : User,
  'token' : TokenIdentifier,
  'notify' : boolean,
  'from' : User,
  'memo' : Memo,
  'subaccount' : [] | [SubAccount__1],
  'amount' : Balance,
};
export type TransferResponse = { 'ok' : Balance } |
  {
    'err' : { 'CannotNotify' : AccountIdentifier__1 } |
      { 'InsufficientBalance' : null } |
      { 'InvalidToken' : TokenIdentifier } |
      { 'Rejected' : null } |
      { 'Unauthorized' : AccountIdentifier__1 } |
      { 'Other' : string }
  };
export type User = { 'principal' : Principal } |
  { 'address' : AccountIdentifier__1 };
export default interface ICBird {
  'acceptCycles' : () => Promise<undefined>,
  'addAsset' : (
      arg_0: AssetHandle,
      arg_1: number,
      arg_2: string,
      arg_3: string,
      arg_4: string,
    ) => Promise<undefined>,
  'addThumbnail' : (arg_0: AssetHandle, arg_1: Array<number>) => Promise<
      undefined
    >,
  'adminKillHeartbeat' : () => Promise<undefined>,
  'adminKillHeartbeatExtra' : (arg_0: string) => Promise<undefined>,
  'adminStartHeartbeat' : () => Promise<undefined>,
  'adminStartHeartbeatExtra' : (arg_0: string) => Promise<undefined>,
  'allPayments' : () => Promise<Array<[Principal, Array<SubAccount>]>>,
  'allSettlements' : () => Promise<Array<[TokenIndex, Settlement]>>,
  'assetTokenMap' : () => Promise<Array<[AssetHandle, TokenIndex]>>,
  'assetsToTokens' : (arg_0: Array<AssetHandle>) => Promise<Array<TokenIndex>>,
  'availableCycles' : () => Promise<bigint>,
  'balance' : (arg_0: BalanceRequest) => Promise<BalanceResponse>,
  'bearer' : (arg_0: TokenIdentifier__1) => Promise<Result_7>,
  'clearPayments' : (arg_0: Principal, arg_1: Array<SubAccount>) => Promise<
      undefined
    >,
  'cronCapEvents' : () => Promise<undefined>,
  'cronDisbursements' : () => Promise<undefined>,
  'cronSalesSettlements' : () => Promise<undefined>,
  'cronSettlements' : () => Promise<undefined>,
  'details' : (arg_0: TokenIdentifier__1) => Promise<Result_8>,
  'extensions' : () => Promise<Array<Extension>>,
  'failedSales' : () => Promise<Array<[AccountIdentifier, SubAccount]>>,
  'getMetadata' : () => Promise<Array<[TokenIndex, Metadata]>>,
  'getMinter' : () => Promise<Principal>,
  'getRegistry' : () => Promise<Array<[TokenIndex, AccountIdentifier]>>,
  'getTokens' : () => Promise<Array<[TokenIndex, Metadata]>>,
  'historicExport' : () => Promise<boolean>,
  'http_request' : (arg_0: HttpRequest) => Promise<HttpResponse>,
  'initCap' : () => Promise<undefined>,
  'isHeartbeatRunning' : () => Promise<boolean>,
  'list' : (arg_0: ListRequest) => Promise<Result_3>,
  'listings' : () => Promise<Array<[TokenIndex, Listing, Metadata]>>,
  'lock' : (
      arg_0: TokenIdentifier__1,
      arg_1: bigint,
      arg_2: AccountIdentifier,
      arg_3: SubAccount,
    ) => Promise<Result_7>,
  'metadata' : (arg_0: TokenIdentifier__1) => Promise<Result_6>,
  'payments' : () => Promise<[] | [Array<SubAccount>]>,
  'pendingCronJobs' : () => Promise<Array<bigint>>,
  'reserve' : (
      arg_0: bigint,
      arg_1: bigint,
      arg_2: AccountIdentifier,
      arg_3: SubAccount,
    ) => Promise<Result_5>,
  'retreive' : (arg_0: AccountIdentifier) => Promise<Result_4>,
  'saleTransactions' : () => Promise<Array<SaleTransaction>>,
  'salesSettings' : (arg_0: AccountIdentifier) => Promise<SaleSettings>,
  'salesSettlements' : () => Promise<Array<[AccountIdentifier, Sale]>>,
  'setMinter' : (arg_0: Principal) => Promise<undefined>,
  'settle' : (arg_0: TokenIdentifier__1) => Promise<Result_3>,
  'settlements' : () => Promise<Array<[TokenIndex, AccountIdentifier, bigint]>>,
  'stats' : () => Promise<
      [bigint, bigint, bigint, bigint, bigint, bigint, bigint]
    >,
  'supply' : (arg_0: TokenIdentifier__1) => Promise<Result_2>,
  'toAddress' : (arg_0: string, arg_1: bigint) => Promise<AccountIdentifier>,
  'tokens' : (arg_0: AccountIdentifier) => Promise<Result_1>,
  'tokens_ext' : (arg_0: AccountIdentifier) => Promise<Result>,
  'transactions' : () => Promise<Array<Transaction>>,
  'transfer' : (arg_0: TransferRequest) => Promise<TransferResponse>,
  'viewDisbursements' : () => Promise<
      Array<[TokenIndex, AccountIdentifier, SubAccount, bigint]>
    >,
};