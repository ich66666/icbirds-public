import { memo, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import * as p5 from "p5";

import { useLocalState } from '../utils/state';



export default function () {
    let canvas = null;

    

    function P5Wrapper({
        sketch = () => { },
        state = useLocalState(),
    }) {

        console.log(`::: P5Wrapper() component has been re-rendered`)

        const sketchContainer = useRef(null)

        useEffect(() => {
            console.log(`::: P5Wrapper()/useEffect()`)
            canvas = new p5(sketch, sketchContainer.current)
            canvas.state = state
            console.log(canvas.state);
            if (canvas.state == null) return (
                <>
                    Loading ...
                </>
            );
            else {
                state.resizeCanvas();
                return () => {
                    console.log(`::: P5Wrapper()/useEffect.return()`)
                    canvas.remove()
                }
            }

        }, [sketch, state.displaylocalToken])


        return (
            <div ref={sketchContainer} className="game">
            </div>
        )
    }

    P5Wrapper.propTypes = {
        state: PropTypes.object,
        sketch: PropTypes.func,
    }

    P5Wrapper.defaultProps = {
        state: {},
        sketch: () => { },
    }

    return memo(P5Wrapper, (_, nextProps) => {
        canvas.state = { ...nextProps.state }

        return true
    })
}