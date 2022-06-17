import { useLocalState } from "./utils/state";


export default function InventoryPipe(props) {
    const state = useLocalState();

    function handleClick() {
        var e = document.querySelector(".item-inventory-pipe-selected");
        e.className = "item-inventory-pipe";
        var name = "#" + props.id;
        var d = document.querySelector(name);
        d.className = "item-inventory-pipe-selected";
        state.setdisplayedLocalPipe(props.id);
    }

    if (props.id == "pipe0")
        return (
            <div style={{ width: "120px" }}>
                <button className={"item-inventory-pipe-selected"} key={props.id} id={props.name}>
                    <div className="pipe" onClick={handleClick}>
                        <img src={"img/pipes/" + props.id + ".png"} alt="" width="80px" />
                    </div>
                </button>
            </div>
        );
    else
        return (
            <div style={{ width: "120px" }}>
                <button className={"item-inventory-pipe"} key={props.id} id={props.name}>
                    <div className="pipe" onClick={handleClick}>
                        <img src={"img/pipes/" + props.id + ".png"} alt="" width="80px" />
                    </div>
                </button>
            </div>
        );
}
