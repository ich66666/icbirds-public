import Hashmap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import TrieMap "mo:base/TrieMap"

actor class Score (_owner : Principal) = this {
    private let eq: (Principal, Principal) -> Bool = func(x, y) { x == y };
    private var max_scores: TrieMap.TrieMap<Principal, Nat> = TrieMap.TrieMap<Principal, Nat>(eq, Principal.hash); 
    private var frontEnd : Principal = Principal.fromText("2vxsx-fae");
    private var  owner : Principal = _owner;

    public shared(msg) func setFrontEnd(p : Text) : async () {
        assert(msg.caller == owner);
        frontEnd := Principal.fromText(p);
    };

    public query(msg)  func get_max_score(p : Principal) : async Nat {
        assert(msg.caller == frontEnd or msg.caller == owner);
        let r = max_scores.get(p);
        switch(r) {
            case(null) return 0;
            case(?val) {
                return val;
            }
        }
    };

    public query(msg) func get_all_score() : async [(Principal, Nat)] {
        assert(msg.caller == frontEnd or msg.caller == owner);
        return Iter.toArray(max_scores.entries());
    };

    public shared({ caller }) func set_new_score(p : Principal, n : Nat) : async () {
        assert(caller == frontEnd or caller == owner);

        let r = max_scores.get(p);
        switch(r) {
            case(null) {
                max_scores.put(p, n);
            };
            case(?val) {
                if(n > val) {
                    max_scores.put(p, n);
                }
            };
        }
    };

    public shared(msg) func getCallerPrincipal() : async (Principal) {
        return msg.caller;
    }
};