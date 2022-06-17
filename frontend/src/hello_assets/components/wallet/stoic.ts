import {StoicIdentity} from "ic-stoic-identity";


StoicIdentity.load().then(async identity => {
    if (identity !== false) {
      //ID is a already connected wallet!
    } else {
      //No existing connection, lets make one!
      identity = await StoicIdentity.connect();
    }
    
    //Lets display the connected principal!
    console.log(identity.getPrincipal().toText());
    
    //Create an actor canister
    // const actor = Actor.createActor(idlFactory, {
    //   agent: new HttpAgent({
    //     identity,
    //   }),
    //   canisterId,
    // });
    
    //Disconnect after
    StoicIdentity.disconnect();
  })