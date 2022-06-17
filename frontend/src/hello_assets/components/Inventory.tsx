import InventoryBird from "./Inventory-Bird";
import InventoryPipe from "./Inventory-Pipe";
import InventoryBackground from "./Inventory-Background";
import { useEffect, useState } from "react";
import { useLocalState } from "./utils/state";
import { useAuth } from "./utils/auth";
import { getCanisterIds } from "./canister/principals";
import { Principal } from "@dfinity/principal";


export function tokenIdentifier(principal, index) {
  const padding = Buffer.from("\x0Atid");
  const array = new Uint8Array([
    ...padding,
    ...Principal.fromText(principal).toUint8Array(),
    ...to32bits(index),
  ]);
  return Principal.fromUint8Array(array).toText();
};

const to32bits = num => {
  let b = new ArrayBuffer(4);
  new DataView(b).setUint32(0, num);
  return Array.from(new Uint8Array(b));
}

class Propss {
  nom: string;
  key: number;

  constructor(n: string, k: number) {
    this.nom = n;
    this.key = k;
  }
}
export const BirdInventory = () => {
  var nb = 12;
  var objects = [] as Array<Propss>;
  for (var k = 0; k < nb; k++) {
    objects.push(new Propss("bird" + k.toString(), k));
  }
  return (
    <>
      {objects.map(function (object) {
        return <InventoryBird name={object.nom} id={object.nom} key={object.key} />;
      })}
    </>
  )
}

export const PipeInventory = () => {
  var nb = 8;
  var objects = [] as Array<Propss>;
  for (var k = 0; k < nb; k++) {
    objects.push(new Propss("pipe" + k.toString(), k));
  }
  return (
    <>
      {objects.map(function (object) {
        return <InventoryPipe name={object.nom} id={object.nom} key={object.key} />;
      })}
    </>
  )
}

export const BackgroundInventory = () => {
  var nb = 5;
  var objects = [] as Array<Propss>;
  for (var k = 0; k < nb; k++) {
    objects.push(new Propss("background" + k.toString(), k));
  }
  return (
    <>
      {objects.map(function (object) {
        return <InventoryBackground name={object.nom} id={object.nom} key={object.key} />;
      })}
    </>
  )
}

export const Inventory = () => {
  const state = useLocalState();
  const auth = useAuth();
  const canister = getCanisterIds();

  const [tokens, setTokens] = useState<BigInt[] | null>(null);
  // const [desc, setDesc] = useState<TokenDesc | null>(null);



  useEffect(() => {
    setTokens(state.userTokens);
    if (tokens !== null) console.log(tokens[0]);

    if (state.userTokens !== null)
      state.setDisplayedToken(state.userTokens[0]);
  }, [state.userTokens])

  if (tokens === null)
    return (
      <div className="inventory">
        {state.loadingWallet ?
          <div >
            <svg className="animate" viewBox="25 25 50 50">
              <circle className="animate" cx="50" cy="50" r="20"></circle>
            </svg>
          </div>
          : <p>Please connect or mint a bird to view your Birds.</p>
        }
      </div>
    )

  return (
    <div className="inventory">
      <h3>My Birds :</h3>
      <div className="list" id="birdInventory">
        {tokens.map((token, i) => (
          <>
            <InventoryBird src={canister.get_img("" + tokenIdentifier("4mupc-myaaa-aaaah-qcz2a-cai", token))} id={"ICBird" + token} key={"ICBird" + token} num={i} />
          </>
        ))
        }
        {tokens != [] ? <></> : <a href="https://entrepot.app/" target="_blank">You don't have any birds</a>}
      </div>
      <h3>My Pipes :</h3>
      <div className="list" id="pipeInventory">
        <PipeInventory />
      </div>
      <h3>My backgrounds :</h3>
      <div className="list" id="backgroundInventory">
        <BackgroundInventory />
      </div>
    </div>
  )
};


export default Inventory;