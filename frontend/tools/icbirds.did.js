export const idlFactory = ({ IDL }) => {
  const Property = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const TokenDesc = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'owner' : IDL.Principal,
    'desc' : IDL.Text,
    'name' : IDL.Text,
    'properties' : IDL.Vec(Property),
  });
  const Time = IDL.Int;
  const Listing = IDL.Record({
    'tokenId' : IDL.Nat,
    'owner' : IDL.Principal,
    'timestamp' : Time,
    'price' : IDL.Nat64,
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'status_code' : IDL.Nat16,
  });
  const MintRequest = IDL.Record({
    'url' : IDL.Text,
    'owner' : IDL.Principal,
    'data' : IDL.Vec(IDL.Nat8),
    'desc' : IDL.Text,
    'name' : IDL.Text,
    'content_type' : IDL.Text,
    'properties' : IDL.Vec(Property),
  });
  const ICPTs = IDL.Record({ 'e8s' : IDL.Nat64 });
  const TransactionNotification = IDL.Record({
    'to' : IDL.Principal,
    'to_subaccount' : IDL.Opt(IDL.Nat8),
    'from' : IDL.Principal,
    'memo' : IDL.Nat64,
    'from_subaccount' : IDL.Opt(IDL.Nat8),
    'amount' : ICPTs,
    'block_height' : IDL.Nat64,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  return IDL.Service({
    'add_genesis_record' : IDL.Func([], [IDL.Nat], []),
    'creators_fee' : IDL.Func([], [IDL.Nat], ['query']),
    'data_of' : IDL.Func([IDL.Nat], [TokenDesc], ['query']),
    'delist' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'description' : IDL.Func([], [IDL.Text], ['query']),
    'get_cycles' : IDL.Func([], [IDL.Nat], ['query']),
    'get_ledger_canister' : IDL.Func([], [IDL.Principal], ['query']),
    'get_listed' : IDL.Func([IDL.Nat], [IDL.Vec(Listing)], ['query']),
    'get_listed_count' : IDL.Func([], [IDL.Nat], ['query']),
    'get_storage_canister' : IDL.Func([], [IDL.Principal], ['query']),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'icon_url' : IDL.Func([], [IDL.Text], ['query']),
    'list' : IDL.Func([IDL.Nat, IDL.Nat64], [IDL.Bool], []),
    'mint' : IDL.Func([MintRequest], [IDL.Nat], []),
    'multi_mint' : IDL.Func([IDL.Vec(MintRequest)], [IDL.Vec(IDL.Nat)], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'owner' : IDL.Func([], [IDL.Principal], ['query']),
    'owner_of' : IDL.Func([IDL.Nat], [IDL.Principal], ['query']),
    'set_description' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'set_icon_url' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'set_ledger_canister' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'set_owner' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'set_storage_canister' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'set_tx_enabled' : IDL.Func([IDL.Bool], [IDL.Bool], []),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'total_supply' : IDL.Func([], [IDL.Nat], ['query']),
    'transaction_notification' : IDL.Func(
        [TransactionNotification],
        [Result],
        [],
      ),
    'transfer_to' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'tx_enabled' : IDL.Func([], [IDL.Bool], ['query']),
    'user_tokens' : IDL.Func([IDL.Principal], [IDL.Vec(IDL.Nat)], ['query']),
  });
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
