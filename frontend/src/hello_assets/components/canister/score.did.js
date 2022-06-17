export default ({ IDL }) => {
  const Score = IDL.Service({
    'getCallerPrincipal' : IDL.Func([], [IDL.Principal], []),

    'get_all_score' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))],
        ['query'],
      ),
    'get_max_score' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'setFrontEnd' : IDL.Func([IDL.Principal], [], []),
    'set_new_score' : IDL.Func([IDL.Principal, IDL.Nat], [], []),
  });
  return Score;
};
export const init = ({ IDL }) => { return [IDL.Principal, IDL.Principal]; };
