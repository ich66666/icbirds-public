import { createContext, useContext, useEffect, useState } from "react";
import { HttpAgent, Actor } from "@dfinity/agent";
// import internetIdentity from "./wallet/ii";
import ICBird from "../canister/icbirds_type";
import { idlFactory as icbirds_idl } from "../canister/icbirds";

import { Token as Token2 } from "../canister/token_type";
import { idlFactory as token_idl } from "../canister/token";

import Score from "../canister/score_type";
import { idlFactory as score_idl } from "../canister/score";

import { getCanisterIds } from "../canister/principals";

import plugWallet, { WalletInterface } from "../wallet/plug";
import { StoicIdentity } from "ic-stoic-identity";

import { Principal } from "@dfinity/principal";


export interface AuthContext {
  isShow: boolean;
  showModal: (show: boolean) => void;

  wallet?: WalletInterface;
  principal?: Principal;
  agent?: HttpAgent;

  balance: bigint | null;

  icbirds?: ICBird;
  score?: Score;
  token?: Token2;

  usePlug: () => void;
  useStoic: () => void;

  setPrincipal: (principal: Principal | undefined) => void;
  setAgent: (agent: HttpAgent | undefined) => void;

  setBalance: (data: bigint | null) => void;
}

// Provider hook that creates auth object and handles state
export function useProvideAuth(): AuthContext {
  const [wallet, setWallet] = useState<WalletInterface | undefined>();


  const [principal, setPrincipal] = useState<Principal | undefined>(undefined);
  const [agent, setAgent] = useState<HttpAgent | undefined>(undefined);
  const [icbirds, setICBirdsActor] = useState<ICBird | undefined>(undefined);
  const [token, setTokenActor] = useState<Token2 | undefined>(undefined);
  const [score, setScore] = useState<Score | undefined>(undefined);
  const [display, setDisplay] = useState(false);
  const [balance, setBalance] = useState<bigint | null>(null);

  const usePlug = function () {
    const wlt = plugWallet();
    setWallet(wlt);
    setDisplay(false);
  }

  const useStoic = function () {
    StoicIdentity.load().then(async identity => {
      if (identity === false) {
        identity = await StoicIdentity.connect();
      }
      initActor(identity);
    })
  }

  async function initActor(identity) {
    let principals = getCanisterIds();
    let canisterId = principals.icbirds;
    // console.log(identity.getPrincipal().toText());
    setPrincipal(identity.getPrincipal());
    setDisplay(false);
    const agent = new HttpAgent({
      host: "https://boundary.ic0.app/",
      identity
    });
    agent.fetchRootKey();

    const actor = Actor.createActor<ICBird>(icbirds_idl, {
      agent,
      canisterId,
    });
    setICBirdsActor(actor);
    canisterId = principals.icbirds_dip20;
    const actor2 = Actor.createActor<Token2>(token_idl, {
      agent,
      canisterId,
    });
    setTokenActor(actor2);
    // StoicIdentity.disconnect();
  }
  //Displays modal to select wallet
  const showModal = function (show: boolean) {
    setDisplay(show);
  }

  //Generate actors when principal is ready
  useEffect(() => {
    if (wallet === undefined) return;
    if (principal === undefined) return;

    const fetchData = async () => {
      let principals = getCanisterIds();
      const icbirdActor = await wallet.getActor<ICBird>(principals.icbirds, icbirds_idl);
      const icbirdsdip20Actor = await wallet.getActor<Token2>(principals.icbirds_dip20, token_idl);
      setICBirdsActor(icbirdActor);
      setTokenActor(icbirdsdip20Actor);
    }
    fetchData();
  }, [principal])

  useEffect(() => {
    const fetchData = async () => {
      let principals = getCanisterIds();

      const agent = new HttpAgent({
        host: "https://ic0.app"
      });
      // agent.fetchRootKey();

      let actr: Score = Actor.createActor(score_idl, { agent, canisterId: principals.score });
      actr.getCallerPrincipal().then((rep) => {
        console.log("PRINCIPAL = " + rep);
      });
      setScore(actr);
    }
    fetchData();
  }, [])

  function get() {
    return {
      showModal,
      isShow: display,
      setPrincipal,
      principal: principal,
      setAgent,

      agent: agent,
      balance,

      wallet,
      icbirds,
      score,
      token,

      usePlug,
      useStoic,
      setBalance,
    };
  }

  return get();
}

const authContext = createContext<AuthContext>(null!);
export let auth: AuthContext;



export function ProvideAuth({ children }) {
  auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
