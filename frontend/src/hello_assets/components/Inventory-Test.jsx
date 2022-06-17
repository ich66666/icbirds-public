import InventoryBird from "./Inventory-Bird";
import InventoryPipe from "./Inventory-Pipe";
import InventoryBackground from "./Inventory-Background";
import {useLocalState} from "./utils/state";
import Account from "./Account";
import OwnedTokens from "./Inventory-Load";



export const BirdInventory = () => {
    var nb = 12;
    var objects = [];
    for(var k = 0; k < nb; k++) {
      objects.push({"nom": "bird"+k.toString(), "key": k});
    }
    return (
      <>
        {objects.map(function(object, i){
          return <InventoryBird name={object.nom} id={object.nom} key={i}/>;
        })}
      </>
    )
  }
  
export const PipeInventory = () => {
    var nb = 3;
    var objects = [];
    for(var k = 0; k < nb; k++) {
      objects.push({"nom": "pipe"+k.toString(), "key": k});
    }
    return (
      <>
        {objects.map(function(object, i){
          return <InventoryPipe name={object.nom} id={object.nom} key={i}/>;
        })}
      </>
    )
  }

export const BackgroundInventory = () => {
  var nb = 1;
  var objects = [];
  for(var k = 0; k < nb; k++) {
    objects.push({"nom": "background"+k.toString(), "key": k});
  }
  return (
    <>
      {objects.map(function(object, i){
        return <InventoryBackground name={object.nom} id={object.nom} key={i}/>;
      })}
    </>
  )
}

export const InventoryTest = () => {
    const state = useLocalState();

    // useEffect(() => {
    //     if (state.displayToken !== null && state.displayToken !== undefined) {
    //         setDesc("ICPunk #" + state.displayToken);
    //         if (state.displayTokenData !== null) {
    //             setImgUrl("http://rwlgt-iiaaa-aaaaa-aaaaa-cai.localhost:8000" + state.displayTokenData?.url);
    //             // setImgUrl("https://qcg3w-tyaaa-aaaah-qakea-cai.raw.ic0.app" + state.displayTokenData?.url);

    //         }
    //     }
    // }, [state.displayToken, state.displayTokenData]);

    // if (state.userTokens != null && state.userTokens.length > 0) {

    return (
        <div className="inventory">
        <h2>Inventory</h2>
        <Account/>
        <h3>My Birds :</h3>
        <div className="list" id="birdInventory">
        <BirdInventory />
        </div>
        <h3>My Pipes :</h3>
        <div className="listpipe" id="pipeInventory"> 
        <PipeInventory />
        </div>
        <h3>My backgrounds :</h3>
        <div className="listbackground" id="backgroundInventory">
        <BackgroundInventory />
        </div>
        <div>
        <OwnedTokens/>
        </div>
    </div>
    )
};


export default Inventory;