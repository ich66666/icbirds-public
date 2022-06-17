import { useLocalState } from "./utils/state";

export default function InventoryBird(props) {
    const state = useLocalState();

    function handleClick() {
        var e = document.querySelector(".item-inventory-bird-selected");
        e.className = "item-inventory-bird";
        var name = "#" + props.id;
        console.log(name);
        var d = document.querySelector(name);
        d.className = "item-inventory-bird-selected";
        state.setdisplayedlocalToken(props.src);
        state.setdisplayedlocalToken((props.id.slice("ICBird".length)));
    }

    // if(props.id == "bird0")
    // return (
    //     <>
    //     <button className={"item-inventory-bird-selected"} key={props.id} id={props.name}>
    //         <div onClick={handleClick}>
    //             <img src={"img/"+props.id+".gif"} alt="" width="80" height="80"/>
    //         </div>
    //     </button>
    // </>
    // );
    // else
    // console.log(props.num );
    if (props.num == 0)
        return (
            <div style={{ width: "120px" }}>
                <button className={"item-inventory-bird-selected"} key={props.key} id={props.id}>
                    <div onClick={handleClick} style={{ display: "table-caption" }}>
                        <img src={props.src} alt="Loading.." width="80" height="80" />
                        <span>{"#" + props.id.slice("ICBird".length)}</span>
                    </div>
                </button>
            </div>
        )

    return (
        <div style={{ width: "120px" }}>
            <button className={"item-inventory-bird"} key={props.i} id={props.id}>
                <div onClick={handleClick} style={{ display: "table-caption" }}>
                    <img src={props.src} alt="Loading.." width="80" height="80" />
                    <span>{"#" + props.id.slice("ICBird".length)}</span>
                </div>
            </button>
        </div>
    );
}
