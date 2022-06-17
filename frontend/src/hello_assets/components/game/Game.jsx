import P5Wrapper from "./P5Wrapper";
import Sketch from "./js/sketch";
import { useLocalState } from "../utils/state";

let P5Wrapper1 = P5Wrapper();



export default function Game() {
    let state = useLocalState();

    state.getHighScore();
    state.resizeCanvas();

    return (
        <>

            <P5Wrapper1
                sketch={Sketch}
                state={state}
            />

        </>
    )
}