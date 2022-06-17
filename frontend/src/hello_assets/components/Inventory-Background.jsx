import { useLocalState } from "./utils/state";

export default function InventoryBackground(props) {
    const state = useLocalState();

    function handleClick() {
        var e = document.querySelector(".item-inventory-background-selected");
        e.className = "item-inventory-background";
        var name = "#" + props.id;
        var d = document.querySelector(name);
        d.className = "item-inventory-background-selected";
        state.setdisplayedLocalBackground(props.id);

    }

    if (props.id == "background0")
        return (
            <div style={{ width: "120px" }}>
                <button style={{width:"120px"}} className={"item-inventory-background-selected"} key={props.id} id={props.name}>
                    <div onClick={handleClick} className="background">
                        <img src={"img/background/" + props.id + ".png"} alt="" />
                    </div>
                </button>
            </div>
        );
    else
        return (
            <div style={{ width: "120px" }}>
                <button style={{width:"120px"}} className={"item-inventory-background"} key={props.id} id={props.name}>
                    <div onClick={handleClick} className="background">
                        <img src={"img/background/" + props.id + ".png"} alt="" />
                    </div>
                </button>
            </div>
        );
}
